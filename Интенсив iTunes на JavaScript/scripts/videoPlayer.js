export const videoPlayerInit = () => {
// video-player
// video-button__play
// video-button__stop
// video-time__passed
// video-progress
// video-time__total

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoVolume = document.querySelector('.video-volume');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoFullscreen = document.querySelector('.video-fullscreen');



    const toggleIcon = () => {
        if (videoPlayer.paused){
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused){
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const addZero = n => n < 10 ? '0' + n : n;

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);


    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const durration = videoPlayer.durration;

        videoProgress.value = (currentTime / durration) * 100;

    //Так же почему-то не корректно работает ползунок

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(durration / 60);
        let secondsTotal = Math.floor(durration % 60);

    //тут я не совсем понимаю, почему не получается отобразить конечное время

        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);

        videoProgress.addEventListener('cange', () => {
            const durration = videoPlayer.durration;
            const value = videoProgress.value; 

            videoPlayer.currentTime = (value * durration) / 100;
        })
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });
    videoPlayer.volume = 0.5;
    videoVolume.value = videoPlayer.volume * 100;

};