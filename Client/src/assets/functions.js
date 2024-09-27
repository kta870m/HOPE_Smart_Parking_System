export const CallPHP = async (dataToSend,file,setter) => {
    const formData = new FormData();
    formData.append('image', dataToSend['image']);
    formData.append('data', JSON.stringify(dataToSend));
    const response = await fetch('http://localhost/social-media/Server/' + file + '.php', {//php function path
        credentials: 'include',method: 'POST',headers: {'Accept': 'application/json',},body: formData,//JSON.stringify(dataToSend),
    });
    if (response.ok) {
        const data = await response.json();// output
        console.log(data);
        if(setter){
          setter(data);
        }
    } else {
        console.error('Bad Request');
        return null;
    }
}

export function remainingTime(targetDateTime,offset) {
    const targetDate = new Date(targetDateTime).getTime() + offset * 60000;
    const now = new Date().getTime();
    const difference = targetDate - now;
    return difference;
}

export function checkOverlap(timePeriods, currentTime) {
    //const currentTime = new Date(); // Current time
    let overlappingPeriod = null;
    timePeriods.map(period => {
        if(period){
            const startTime = new Date(period.start_time).getTime();
            const endTime = new Date(startTime + period.duration * 60000); // Calculate end time
    
            if (currentTime >= startTime && currentTime < endTime) {
                overlappingPeriod = period;
            }
        }
    });
    let remainingTime = 0;
    if (overlappingPeriod) {
        const startTime = new Date(overlappingPeriod.start_time).getTime();
        const endTime = new Date(startTime + overlappingPeriod.duration * 60000);
        remainingTime = endTime - currentTime;
    } else {
        let nextStartTime = Infinity;
        timePeriods.map(period => {
            const startTime = new Date(period.start_time).getTime();
            if (startTime > currentTime && startTime < nextStartTime) {
                nextStartTime = startTime;
            }
        });

        remainingTime = -(nextStartTime - currentTime);
    }
    return remainingTime;
}

export function stringTime(time) {
    if (time <= 0) {
        return 'now';
    }
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
}

export function formatTime(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = milliseconds / 1000;

    // Calculate hours, minutes and seconds
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    // Format the time string
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return formattedTime;
}

export function getFormattedDate() {
    const now = new Date();
  
  // Extract date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(now.getDate()).padStart(2, '0');
  
  // Extract time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Format date and time as yyyy/mm/dd hh:mm:ss
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }