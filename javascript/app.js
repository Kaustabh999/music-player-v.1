const music = document.getElementById("audio");
const play = document.getElementById("play");
const image = document.getElementById("img");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const current_time = document.getElementById("current_time");
const total_duration = document.getElementById("duration");
const progress_div = document.getElementById("progress_div");

const songs = [
    {
    	name:"no1",
    	title: "Tigers on Trains",
    	artist: "Carter Vail",
    	image: "pic1"
    },
    {
    	name: "no2",
    	title: "Waste My Time",
    	artist: "The Devil Music Co.",
    	image: "pic2"
    },
    {
    	name: "no3",
    	title: "b a r k a",
    	artist: "Lilly Wolf",
    	image: "pic3"
    },
    {
    	name: "no4",
    	title: "Save me",
    	artist: "Millio",
    	image: "pic4"
    },
    {
    	name: "no5",
    	title: "This is war",
    	artist: "Bert Jerred",
    	image: "pic5"
    }
];

let isPlaying = false;


const playMusic = () => {
	isPlaying = true;
	music.play();  /* "play()" is use to play the audio. */
   	play.classList.replace("fa-play", "fa-pause"); /* "replace()" is use to replace class.
   	                                                  1) The classList property returns the class name(s) of an element, as a DOMTokenList object.
                                                      2) This property is useful to add, remove and toggle CSS classes on an element.
                                                      3) The classList property is read-only, however, you can modify it by using the add() and remove() methods.*/
    image.classList.add("anime");
};

const pauseMusic = () => {
	isPlaying = false;
	music.pause(); 
   	play.classList.replace("fa-pause", "fa-play"); 
    image.classList.remove("anime");
};

play.addEventListener("click", () => {
	if(isPlaying) {
		pauseMusic();
	}
	else {
        playMusic();
	}
});

// Changing music (next or previous)
const loadSong = (songs) => {
	title.textContent = songs.title;
	artist.textContent = songs.artist;
	music.src = "music/" + songs.name + ".mp3";
	image.src = "images/" + songs.image + ".png";
}

// loadSong(songs[2]);
let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// music progress bar, current time and total duration js work.
music.addEventListener("timeupdate", (event) => { //The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
	// console.log(event);
	const {currentTime, duration} = event.srcElement; // This is object destructering. where we have a object call "srcElement" in "timeupdate" event. And then we destructure the data from the object and use it. 
	// console.log(currentTime);
	// console.log(duration);
	let progress_time = (currentTime/duration)*100; // This is use to find the percentage of total progress.
	// console.log(progress_time);
	progress.style.width = `${progress_time}%`;

	//music total duration
	let min_duration = Math.floor(duration / 60);
	let sec_duration = Math.floor(duration % 60);

	// if (duration < 10) {
	// 	sec_duration = `0${sec_duration}`; // This part is not working. This part is writen so that if their is a single digit in sec we can add a 0 after it. eg if it looks like 1.1 then due to this part it will be look like 1.10 */  
	// }

	tot_duration = `${min_duration}:${sec_duration}`;
	
	 if (duration) {
	 	total_duration.textContent = `${tot_duration}`; 
	 }

	//music current duration update.
	let min_currentTime = Math.floor(currentTime / 60);
	let sec_currentTime = Math.floor(currentTime % 60);

    if (currentTime < 10) {
		sec_currentTime = `0${sec_currentTime}`; /*This part is writen so that if their is a single digit in sec we can 
		                                          add a 0 after it. eg if it looks like 1.1 then due to this part it will 
		                                          be look like 1.10 */ 
	}
	tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
	current_time.textContent = `${tot_currentTime}`;
});

// Progress onclick functionality.
progress_div.addEventListener("click", (event) => {
	// console.log(event);
	const { duration } = music; //object destructruing.
	// console.log(duration);
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
});

// Due to this EventListener when one song will finish next song will start. "ended" is an build in event. 
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);