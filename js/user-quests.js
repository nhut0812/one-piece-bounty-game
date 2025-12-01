// =====================================================
// USER QUESTS & SUBMISSIONS HANDLER
// =====================================================

const QUESTS_KEY = 'onePieceQuests';
const SUBMISSIONS_KEY = 'onePieceSubmissions';
const PIRATES_KEY = 'onePiecePirates';
const CREWS_KEY = 'onePieceCrews';
const QUEST_ATTEMPTS_KEY = 'onePieceQuestAttempts';

// Load attempts từ Firebase
async function loadAttemptsFromFirebase() {
  if (typeof database === 'undefined' || !database) return;
  
  try {
    const snapshot = await database.ref('sharedData/questAttempts').once('value');
    const attempts = snapshot.val();
    if (attempts) {
      localStorage.setItem(QUEST_ATTEMPTS_KEY, JSON.stringify(attempts));
    }
  } catch (error) {
    console.error('Lỗi load attempts từ Firebase:', error);
  }
}

// Load pirates từ Firebase để cập nhật điểm
async function loadPiratesFromFirebase() {
  if (typeof database === 'undefined' || !database) return;
  
  try {
    const snapshot = await database.ref('sharedData/pirates').once('value');
    const pirates = snapshot.val();
    if (pirates && pirates.length > 0) {
      localStorage.setItem(PIRATES_KEY, JSON.stringify(pirates));
    }
  } catch (error) {
    console.error('Lỗi load pirates từ Firebase:', error);
  }
}

// Check if user can do quest
async function canDoQuest(questTitle, questType) {
  const user = getCurrentUser();
  if (!user) return { can: false, reason: 'Chưa đăng nhập' };
  
  // Luôn load attempts từ Firebase trước để tránh gian lận
  await loadAttemptsFromFirebase();
  
  const attempts = JSON.parse(localStorage.getItem(QUEST_ATTEMPTS_KEY) || '{}');
  const userAttempts = attempts[user.username] || {};
  const questAttempts = userAttempts[questTitle] || [];
  
  const now = new Date();
  
  if (questType === 'special') {
    // Check if done this month
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const doneThisMonth = questAttempts.some(attempt => {
      const attemptDate = new Date(attempt.date);
      const attemptMonth = `${attemptDate.getFullYear()}-${String(attemptDate.getMonth() + 1).padStart(2, '0')}`;
      return attemptMonth === thisMonth;
    });
    
    if (doneThisMonth) {
      return { can: false, reason: 'Bạn đã làm nhiệm vụ này trong tháng này' };
    }
  } else {
    // Check if done 3 times today
    const today = now.toISOString().split('T')[0];
    const doneToday = questAttempts.filter(attempt => {
      const attemptDate = attempt.date.split('T')[0];
      return attemptDate === today;
    }).length;
    
    if (doneToday >= 3) {
      return { can: false, reason: `Bạn đã làm nhiệm vụ này ${doneToday}/3 lần hôm nay` };
    }
  }
  
  return { can: true };
}

// Record quest attempt
function recordQuestAttempt(questTitle) {
  const user = getCurrentUser();
  if (!user) return;
  
  const pirates = JSON.parse(localStorage.getItem(PIRATES_KEY) || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  
  if (!userPirate) {
    console.error('Không tìm thấy hải tặc liên kết');
    return;
  }
  
  const studentName = userPirate.name; // Dùng tên hải tặc thay vì username
  
  const attempts = JSON.parse(localStorage.getItem(QUEST_ATTEMPTS_KEY) || '{}');
  if (!attempts[studentName]) attempts[studentName] = {};
  if (!attempts[studentName][questTitle]) {
    attempts[studentName][questTitle] = {
      count: 0,
      dates: []
    };
  }
  
  // Tăng count và thêm ngày
  attempts[studentName][questTitle].count += 1;
  attempts[studentName][questTitle].dates.push(new Date().toISOString());
  
  localStorage.setItem(QUEST_ATTEMPTS_KEY, JSON.stringify(attempts));
  
  // Sync ngay attempts lên Firebase
  if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
    const db = firebase.database();
    db.ref('questAttempts').set(attempts).then(() => {
      console.log('✅ Đã sync lượt làm bài lên Firebase');
    }).catch(err => {
      console.error('❌ Lỗi sync attempts:', err);
    });
  }
}

// Get remaining attempts for today
function getRemainingAttempts(questTitle, questType) {
  const user = getCurrentUser();
  if (!user) return 0;
  
  const pirates = JSON.parse(localStorage.getItem(PIRATES_KEY) || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  if (!userPirate) return 0;
  
  const studentName = userPirate.name;
  
  const attempts = JSON.parse(localStorage.getItem(QUEST_ATTEMPTS_KEY) || '{}');
  const userAttempts = attempts[studentName] || {};
  const questAttemptData = userAttempts[questTitle] || { count: 0, dates: [] };
  
  const now = new Date();
  
  if (questType === 'special') {
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const doneThisMonth = questAttemptData.dates.some(dateStr => {
      const attemptDate = new Date(dateStr);
      const attemptMonth = `${attemptDate.getFullYear()}-${String(attemptDate.getMonth() + 1).padStart(2, '0')}`;
      return attemptMonth === thisMonth;
    });
    return doneThisMonth ? 0 : 1;
  } else {
    const today = now.toISOString().split('T')[0];
    const doneToday = questAttemptData.dates.filter(dateStr => {
      const attemptDate = dateStr.split('T')[0];
      return attemptDate === today;
    }).length;
    return Math.max(0, 3 - doneToday);
  }
}

// Load quests by filter (grade and subject)
function loadQuestsByFilter() {
  const grade = document.getElementById('gradeFilter').value;
  const subject = document.getElementById('subjectFilter').value;
  
  if (!grade || !subject) {
    showToast('warning', '⚠️ Vui lòng chọn cả lớp và môn học!');
    return;
  }
  
  // Show quest sections
  document.querySelector('.regular-quests-section').style.display = 'block';
  document.querySelector('.special-quests-section').style.display = 'block';
  
  // Load with filter
  loadRegularQuests(grade, subject);
  loadSpecialQuests(grade, subject);
  
  // Scroll to quests
  document.querySelector('.regular-quests-section').scrollIntoView({ behavior: 'smooth' });
}

// Load regular quests for student
function loadRegularQuests(filterGrade = null, filterSubject = null) {
  const questsList = document.getElementById('regularQuestsList');
  if (!questsList) {
    console.error('Không tìm thấy element regularQuestsList');
    return;
  }
  
  const quests = JSON.parse(localStorage.getItem(QUESTS_KEY) || '[]');
  console.log('Total quests:', quests.length, quests);
  let regularQuests = quests.filter(q => q.type === 'quiz' || !q.type);
  
  // Apply filter if provided
  if (filterGrade && filterSubject) {
    regularQuests = regularQuests.filter(q => q.grade === filterGrade && q.subject === filterSubject);
  }
  
  console.log('Regular quests:', regularQuests.length, regularQuests);
  
  if (regularQuests.length === 0) {
    questsList.innerHTML = '<p style="color: #95a5a6; text-align: center;">Chưa có nhiệm vụ thường nào</p>';
    return;
  }
  
  questsList.innerHTML = '';
  regularQuests.forEach((quest, index) => {
    const gradeText = quest.grade ? `Khối ${quest.grade}` : '';
    const subjectText = quest.subject === 'tin-hoc' ? 'Tin học' : quest.subject === 'cong-nghe' ? 'Công nghệ' : '';
    const rewardPerQuestion = quest.rewardPerQuestion || 100;
    const penaltyPerQuestion = quest.penaltyPerQuestion || 0;
    const questionCount = quest.questions?.length || 0;
    
    const remaining = getRemainingAttempts(quest.title, 'quiz');
    
    const questCard = document.createElement('div');
    questCard.className = 'quest-card';
    questCard.innerHTML = `
      <div class="quest-card-header">
        <div>
          <h4>📝 ${quest.title}</h4>
          <div style="display: flex; gap: 5px; margin-top: 5px;">
            ${gradeText ? `<span class="badge" style="background: #9b59b6;">🎓 ${gradeText}</span>` : ''}
            ${subjectText ? `<span class="badge" style="background: #3498db;">📖 ${subjectText}</span>` : ''}
          </div>
        </div>
        <span class="badge" style="background: ${remaining > 0 ? '#27ae60' : '#e74c3c'};">
          ${remaining}/3 lần
        </span>
      </div>
      <div class="quest-card-body">
        <p style="color: #ecf0f1; margin-bottom: 10px;">${quest.description || ''}</p>
        <p style="color: #95a5a6; font-size: 14px;">📚 ${questionCount} câu hỏi (random 5 câu)</p>
        <p style="color: #f39c12; font-weight: 600; margin-top: 10px;">💰 +${rewardPerQuestion}฿/đúng | -${penaltyPerQuestion}฿/sai</p>
      </div>
      <div class="quest-card-actions">
        <button class="btn-do-quest" onclick="openDoQuizModal(${index})" ${remaining <= 0 ? 'disabled' : ''}>
          ${remaining > 0 ? '✍️ Làm Bài' : '🚫 Hết lượt hôm nay'}
        </button>
      </div>
    `;
    questsList.appendChild(questCard);
  });
}

// Load special quests for student
function loadSpecialQuests(filterGrade = null, filterSubject = null) {
  const questsList = document.getElementById('specialQuestsList');
  if (!questsList) {
    console.error('Không tìm thấy element specialQuestsList');
    return;
  }
  
  const quests = JSON.parse(localStorage.getItem(QUESTS_KEY) || '[]');
  let specialQuests = quests.filter(q => q.type === 'special');
  
  // Apply filter if provided
  if (filterGrade && filterSubject) {
    specialQuests = specialQuests.filter(q => q.grade === filterGrade && q.subject === filterSubject);
  }
  
  console.log('Special quests:', specialQuests.length, specialQuests);
  
  if (specialQuests.length === 0) {
    questsList.innerHTML = '<p style="color: #95a5a6; text-align: center;">Chưa có nhiệm vụ đặc biệt nào</p>';
    return;
  }
  
  questsList.innerHTML = '';
  specialQuests.forEach((quest, index) => {
    const gradeText = quest.grade ? `Khối ${quest.grade}` : '';
    const subjectText = quest.subject === 'tin-hoc' ? 'Tin học' : quest.subject === 'cong-nghe' ? 'Công nghệ' : '';
    const maxScore = quest.maxScore || quest.rewardPerQuestion || 1000;
    
    const remaining = getRemainingAttempts(quest.title, 'special');
    
    const questCard = document.createElement('div');
    questCard.className = 'quest-card';
    questCard.innerHTML = `
      <div class="quest-card-header">
        <div>
          <h4>📝 ${quest.title}</h4>
          <div style="display: flex; gap: 5px; margin-top: 5px;">
            ${gradeText ? `<span class="badge" style="background: #9b59b6;">🎓 ${gradeText}</span>` : ''}
            ${subjectText ? `<span class="badge" style="background: #3498db;">📖 ${subjectText}</span>` : ''}
          </div>
        </div>
        <span class="badge" style="background: ${remaining > 0 ? '#27ae60' : '#e74c3c'};">
          ${remaining > 0 ? 'Còn lượt' : 'Hết lượt'}
        </span>
      </div>
      <div class="quest-card-body">
        <p style="color: #ecf0f1; margin-bottom: 10px;">${quest.description || ''}</p>
        <p style="color: #95a5a6; font-size: 14px; white-space: pre-wrap; background: rgba(52, 73, 94, 0.3); padding: 10px; border-radius: 5px;">${quest.requirements || 'Không có yêu cầu cụ thể'}</p>
        <p style="color: #f39c12; font-weight: 600; margin-top: 10px;">💰 Điểm tối đa: ${maxScore}฿</p>
      </div>
      <div class="quest-card-actions">
        <button class="btn-submit-quest" onclick="openSubmitQuestModal('${quest.title}', ${index})" ${remaining <= 0 ? 'disabled' : ''}>
          ${remaining > 0 ? '📤 Nộp Bài' : '🚫 Đã nộp tháng này'}
        </button>
      </div>
    `;
    questsList.appendChild(questCard);
  });
}

// Load user's submissions
async function loadMySubmissions() {
  const submissionsList = document.getElementById('mySubmissionsList');
  if (!submissionsList) return;
  
  const user = getCurrentUser();
  if (!user) return;
  
  const pirates = JSON.parse(localStorage.getItem(PIRATES_KEY) || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  if (!userPirate) {
    submissionsList.innerHTML = '<p style="color: #95a5a6; text-align: center;">Bạn chưa có hải tặc liên kết</p>';
    return;
  }
  
  // Load from Firebase
  if (typeof firebase === 'undefined' || !firebase.apps.length) {
    submissionsList.innerHTML = '<p style="color: #95a5a6; text-align: center;">Đang kết nối Firebase...</p>';
    return;
  }
  
  try {
    const db = firebase.database();
    const snapshot = await db.ref('submissions').once('value');
    const submissionsData = snapshot.val();
    
    if (!submissionsData) {
      submissionsList.innerHTML = '<p style="color: #95a5a6; text-align: center;">Bạn chưa nộp bài nào</p>';
      return;
    }
    
    // Convert to array and filter by student
    const allSubmissions = Object.keys(submissionsData).map(key => ({
      id: key,
      ...submissionsData[key]
    }));
    
    const mySubmissions = allSubmissions.filter(s => s.studentName === userPirate.name);
    
    if (mySubmissions.length === 0) {
      submissionsList.innerHTML = '<p style="color: #95a5a6; text-align: center;">Bạn chưa nộp bài nào</p>';
      return;
    }
    
    // Sort by date descending
    mySubmissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    submissionsList.innerHTML = '';
    mySubmissions.forEach(sub => {
      const statusBadge = sub.status === 'pending' ? '⏳ Chờ duyệt' : 
                         sub.status === 'approved' ? '✅ Đã duyệt' : '❌ Từ chối';
      const statusColor = sub.status === 'pending' ? '#f39c12' : 
                         sub.status === 'approved' ? '#27ae60' : '#e74c3c';
      const submitDate = new Date(sub.submittedAt).toLocaleString('vi-VN');
      
      const subCard = document.createElement('div');
      subCard.className = 'submission-card';
      subCard.innerHTML = `
        <div class="submission-card-header">
          <h4>📝 ${sub.questTitle}</h4>
          <span class="badge" style="background: ${statusColor};">${statusBadge}</span>
        </div>
        <div class="submission-card-body">
          <p style="color: #95a5a6; font-size: 14px;">📅 ${submitDate}</p>
          ${sub.score !== undefined && sub.status === 'approved' ? `<p style="color: #f39c12; font-weight: 600; margin-top: 10px;">💰 Điểm: ${sub.score}฿</p>` : ''}
          ${sub.feedback ? `<p style="margin-top: 10px; padding: 10px; background: rgba(52, 73, 94, 0.3); border-radius: 5px; font-size: 14px; color: #ecf0f1;"><strong>💬 Nhận xét:</strong><br>${sub.feedback}</p>` : ''}
          ${sub.images && sub.images.length > 0 ? `
            <div style="margin-top: 10px;">
              <strong style="color: #ecf0f1;">🖼️ Hình ảnh đã nộp:</strong>
              <div style="display: flex; gap: 5px; margin-top: 5px; flex-wrap: wrap;">
                ${sub.images.map(img => `<img src="${img}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px; cursor: pointer;" onclick="window.open('${img}', '_blank')">`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
      submissionsList.appendChild(subCard);
    });
  } catch (error) {
    console.error('Load submissions error:', error);
    submissionsList.innerHTML = '<p style="color: #e74c3c; text-align: center;">❌ Lỗi khi tải bài nộp</p>';
  }
}

// Open do quiz modal
async function openDoQuizModal(questIndex) {
  const quests = JSON.parse(localStorage.getItem(QUESTS_KEY) || '[]');
  const regularQuests = quests.filter(q => q.type === 'quiz' || !q.type);
  const quest = regularQuests[questIndex];
  
  if (!quest) {
    showToast('error', '❌ Không tìm thấy nhiệm vụ!');
    return;
  }
  
  const canDo = await canDoQuest(quest.title, 'quiz');
  if (!canDo.can) {
    showToast('warning', '⚠️ ' + canDo.reason);
    return;
  }
  
  // Random 5 questions from the quest
  const allQuestions = quest.questions || [];
  if (allQuestions.length === 0) {
    showToast('error', '❌ Nhiệm vụ này chưa có câu hỏi!');
    return;
  }
  
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, Math.min(5, allQuestions.length));
  
  document.getElementById('quizQuestIndex').value = questIndex;
  document.getElementById('quizQuestTitle').value = quest.title;
  document.getElementById('quizModalTitle').textContent = `📝 ${quest.title}`;
  document.getElementById('quizQuestTitleDisplay').textContent = quest.title;
  document.getElementById('quizQuestionCount').textContent = selectedQuestions.length;
  document.getElementById('quizRewardPerQuestion').textContent = quest.rewardPerQuestion || 100;
  document.getElementById('quizPenaltyPerQuestion').textContent = quest.penaltyPerQuestion || 0;
  
  // Render questions
  const container = document.getElementById('quizQuestionsContainer');
  container.innerHTML = '';
  
  selectedQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.innerHTML = `
      <div class="quiz-question-header">
        <strong>Câu ${index + 1}:</strong> ${q.question}
      </div>
      <div class="quiz-options">
        ${q.options.map((opt, optIndex) => `
          <label class="quiz-option">
            <input type="radio" name="question_${index}" value="${optIndex}" required>
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <input type="hidden" class="correct-answer" value="${q.correctAnswer}">
    `;
    container.appendChild(questionDiv);
  });
  
  openModal('doQuizModal');
}

// Handle submit quiz
function handleSubmitQuiz(event) {
  event.preventDefault();
  
  const user = getCurrentUser();
  if (!user) {
    showToast('error', '❌ Bạn cần đăng nhập!');
    return;
  }
  
  const pirates = JSON.parse(localStorage.getItem(PIRATES_KEY) || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  
  if (!userPirate) {
    showToast('error', '❌ Bạn chưa có hải tặc liên kết! Vui lòng liên hệ admin để liên kết tài khoản.');
    return;
  }
  
  const questIndex = parseInt(document.getElementById('quizQuestIndex').value);
  const questTitle = document.getElementById('quizQuestTitle').value;
  
  const quests = JSON.parse(localStorage.getItem(QUESTS_KEY) || '[]');
  const regularQuests = quests.filter(q => q.type === 'quiz' || !q.type);
  const quest = regularQuests[questIndex];
  
  // Calculate score
  const questions = document.querySelectorAll('.quiz-question');
  let correctCount = 0;
  let wrongCount = 0;
  
  questions.forEach((q, index) => {
    const selectedOption = q.querySelector(`input[name="question_${index}"]:checked`);
    const correctAnswer = parseInt(q.querySelector('.correct-answer').value);
    
    if (selectedOption && parseInt(selectedOption.value) === correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });
  
  const rewardPerQuestion = quest.rewardPerQuestion || 100;
  const penaltyPerQuestion = quest.penaltyPerQuestion || 0;
  
  const earnedPoints = correctCount * rewardPerQuestion;
  const lostPoints = wrongCount * penaltyPerQuestion;
  const totalScore = earnedPoints - lostPoints;
  
  // Update pirate bounty (cho phép âm nếu trừ nhiều)
  const oldBounty = userPirate.bounty || 0;
  userPirate.bounty = Math.max(0, oldBounty + totalScore); // Bounty không âm, nhưng có thể giảm
  const actualChange = userPirate.bounty - oldBounty;
  
  localStorage.setItem(PIRATES_KEY, JSON.stringify(pirates));
  
  // Sync ngay pirates lên Firebase để lưu điểm
  if (typeof database !== 'undefined' && database) {
    database.ref('sharedData/pirates').set(pirates).then(() => {
      console.log('✅ Đã sync điểm lên Firebase');
      // Update lastUpdate
      database.ref('sharedData/lastUpdate').set(Date.now());
    }).catch(err => {
      console.error('❌ Lỗi sync điểm:', err);
    });
  }
  
  // Record attempt (cũng sẽ sync)
  recordQuestAttempt(questTitle);
  
  closeModal('doQuizModal');
  
  // Hiển thị thông báo chi tiết
  let message = `✅ Hoàn thành!\n`;
  message += `✔️ Đúng: ${correctCount} câu (+${earnedPoints}฿)\n`;
  message += `❌ Sai: ${wrongCount} câu (-${lostPoints}฿)\n`;
  message += `💰 Tổng: ${actualChange >= 0 ? '+' : ''}${actualChange}฿`;
  
  showToast(actualChange >= 0 ? 'success' : 'warning', message);
  
  // Reload quests to update remaining attempts
  loadRegularQuests();
  
  // Reload user profile if on user page
  if (typeof loadUserProfile === 'function') {
    const currentUser = getCurrentUser();
    if (currentUser) loadUserProfile(currentUser);
  }
}

// Open submit quest modal
async function openSubmitQuestModal(questTitle, questIndex) {
  const quests = JSON.parse(localStorage.getItem(QUESTS_KEY) || '[]');
  const specialQuests = quests.filter(q => q.type === 'special');
  const quest = specialQuests[questIndex];
  
  if (!quest) {
    showToast('error', '❌ Không tìm thấy nhiệm vụ!');
    return;
  }
  
  const canDo = await canDoQuest(quest.title, 'special');
  if (!canDo.can) {
    showToast('warning', '⚠️ ' + canDo.reason);
    return;
  }
  
  document.getElementById('submitQuestId').value = questIndex;
  document.getElementById('submitQuestTitle').value = quest.title;
  document.getElementById('submitQuestTitleDisplay').textContent = quest.title;
  document.getElementById('submitQuestRequirements').textContent = quest.requirements || 'Không có yêu cầu cụ thể';
  document.getElementById('imagePreviewContainer').innerHTML = '';
  document.getElementById('submitQuestImages').value = '';
  
  openModal('submitQuestModal');
}

// Preview images before submit
document.addEventListener('DOMContentLoaded', function() {
  const imageInput = document.getElementById('submitQuestImages');
  if (imageInput) {
    imageInput.addEventListener('change', function(e) {
      const previewContainer = document.getElementById('imagePreviewContainer');
      previewContainer.innerHTML = '';
      
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.cssText = 'width: 100px; height: 100px; object-fit: cover; border-radius: 5px; border: 2px solid #3498db;';
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  }
  
  // Load quests and submissions on page load
  if (document.getElementById('specialQuestsList')) {
    loadRegularQuests();
    loadSpecialQuests();
    loadMySubmissions();
  }
});

// Handle submit quest
async function handleSubmitQuest(event) {
  event.preventDefault();
  
  const user = getCurrentUser();
  if (!user) {
    showToast('error', '❌ Bạn cần đăng nhập!');
    return;
  }
  
  const pirates = JSON.parse(localStorage.getItem(PIRATES_KEY) || '[]');
  const crews = JSON.parse(localStorage.getItem(CREWS_KEY) || '[]');
  const userPirate = pirates.find(p => p.name === user.pirateId);
  
  if (!userPirate) {
    showToast('error', '❌ Bạn chưa có hải tặc liên kết! Vui lòng liên hệ admin để liên kết tài khoản.');
    return;
  }
  
  const questTitle = document.getElementById('submitQuestTitle').value;
  const imageFiles = document.getElementById('submitQuestImages').files;
  
  if (imageFiles.length === 0) {
    showToast('error', '❌ Vui lòng chọn ít nhất một hình ảnh!');
    return;
  }
  
  // Check Firebase
  if (typeof firebase === 'undefined' || !firebase.apps.length) {
    showToast('error', '❌ Firebase chưa sẵn sàng! Vui lòng thử lại.');
    return;
  }
  
  showToast('info', '⏳ Đang xử lý hình ảnh...');
  
  try {
    // Get Firebase database
    const db = firebase.database();
    
    // Convert images to Base64
    const imagePromises = Array.from(imageFiles).map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
    
    const imageBase64Array = await Promise.all(imagePromises);
    
    // Create submission object
    const submission = {
      studentName: userPirate.name,
      crewName: userPirate.crew,
      questTitle: questTitle,
      images: imageBase64Array,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      score: 0,
      feedback: ''
    };
    
    // Save to Firebase Realtime Database
    const submissionsRef = db.ref('submissions');
    await submissionsRef.push(submission);
    
    // Record attempt
    recordQuestAttempt(questTitle);
    
    closeModal('submitQuestModal');
    showToast('success', '✅ Đã nộp bài thành công! Chờ giáo viên duyệt.');
    loadMySubmissions();
    loadSpecialQuests(); // Reload to update remaining attempts
  } catch (error) {
    console.error('Upload error:', error);
    showToast('error', '❌ Lỗi khi upload bài nộp: ' + error.message);
  }
}

// Remove Vietnamese tones for file path
function removeVietnameseTones(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

// Helper function to show toast
function showToast(type, message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Helper function to open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

// Helper function to close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}
