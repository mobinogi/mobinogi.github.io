// barrier.js
document.addEventListener('DOMContentLoaded', function () {
    // Barrier 알람 설정 시간 (12:00, 15:00, 19:00, 21:00)
    const barrierAlarmTimes = [
      { hour: 12, minute: 0 },
      { hour: 15, minute: 0 },
      { hour: 19, minute: 0 },
      { hour: 21, minute: 0 }
    ];
  
    const barrierAlarmSound = document.getElementById('barrier-alarm-sound');
    const barrierStatus = document.getElementById('barrier-status');
    const toggleButton = document.getElementById('barrier-toggle');
  
    let alarmActive = false;
    let intervalId;
  
    function updateStatus(message) {
      if (barrierStatus) {
        barrierStatus.innerText = message;
      }
    }
  
    // 매분 0초에 설정한 시간에 도달하면 알람을 재생하는 함수
    function checkAndTriggerBarrierAlarm() {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
  
      // 매분 0초일 때만 검사
      if (currentSecond !== 0) return;
  
      barrierAlarmTimes.forEach(function(time) {
        if (currentHour === time.hour && currentMinute === time.minute) {
          console.log(`Barrier 알람 울림: ${time.hour}:${(time.minute < 10 ? '0' : '') + time.minute}`);
          if (barrierAlarmSound) {
            barrierAlarmSound.currentTime = 0;
            barrierAlarmSound.play().catch(error => {
              console.error('Barrier 알람 소리 재생 오류:', error);
            });
          }
          updateStatus('알람 울림: ' + now.toLocaleTimeString());
        }
      });
    }
  
    // 토글 버튼 클릭 시 동작: 활성화/비활성화 전환
    toggleButton.addEventListener('click', function () {
      if (!alarmActive) {
        // 활성화: 알람 체크 시작
        alarmActive = true;
        toggleButton.innerText = "활성화";
        updateStatus("알람 활성화됨: " + new Date().toLocaleTimeString());
        intervalId = setInterval(checkAndTriggerBarrierAlarm, 1000);
      } else {
        // 비활성화: 알람 체크 중지
        alarmActive = false;
        toggleButton.innerText = "비활성화";
        updateStatus("알람 비활성화됨");
        clearInterval(intervalId);
      }
    });
  });
  