const songsList=[
    {id: 1, name: "Shape of You", artist: "Ed Shaaran", img:"/imgs/shapeOfYou.jpeg", genre: "Pop", source:"/songs/Shape-Of-You.mp3"},
    {id: 2, name: "Someone like Me", artist: "Adele", img:"/imgs/someoneLikeMe.jpeg", genre: "Pop", source:"songs/Someone Like Me.mp3"},
    {id: 3, name: "Beautiful Mistakes", artist: "Maroon", img:"imgs/BeautifulMistakes.jpeg", genre: "Hip Hop", source:"songs/Beautiful Mistakes.mp3"},
    {id: 4, name: "Hop 192", artist: "Asim Riaz", img:"imgs/Hop 192.jpeg", genre: "Hip Hop", source:"songs/Hop_192.mp3"},
    {id: 5, name: "Truth on The Wall", artist: "B. Ajaneesh", img:"imgs/Truth on the wall.jpeg", genre: "Rock", source:"songs/Truth On The Wall.mp3"}];

const userPlaylists=[];
//console.log(songsList);
const themebtn=document.getElementById("theme");
function toggleTheme(){
  themebtn.addEventListener("click", () =>{
    if (themebtn.className=="light"){
        document.querySelector(".head").style.backgroundColor="gray";
        document.querySelector(".head").style.color="white";
        document.querySelector("body").style.backgroundColor="black";
        
        document.querySelector(".allSongsDiv").style.backgroundColor="gray";
        document.querySelector(".cardDiv").style.backgroundColor="gray";
        document.querySelector(".playListDiv").style.backgroundColor="gray";
        

        themebtn.className="dark";
    }
    else if (themebtn.className=="dark"){
        document.querySelector(".head").style.backgroundColor="rgb(101, 145, 226)";
        document.querySelector(".head").style.color="black";
        document.querySelector("body").style.backgroundColor="white";
        
        document.querySelector(".allSongsDiv").style.backgroundColor="rgb(101, 145, 226)";
        document.querySelector(".cardDiv").style.backgroundColor="rgb(101, 145, 226)";
        document.querySelector(".playListDiv").style.backgroundColor="rgb(101, 145, 226)";
       //document.querySelector(".head").style.backgroundColor="antiquewhite";
        themebtn.className="light";
    }
    //console.log(themebtn.className);
});
}

const dropMenu=document.getElementById("selectGenre");

function defaultShowSongs(){
for(let i=0;i<songsList.length;i++){

        const songbtn=document.createElement("button");
        songbtn.className="songsFiltered";
        songbtn.textContent=songsList[i]["name"] +"-"+ songsList[i]["artist"];
        document.getElementById("filteredSongs").appendChild(songbtn);
    
}
}

function showSongs(){
    defaultShowSongs();
    renderCurrentSong();
dropMenu.addEventListener("change", ()=>{
    let dropMenuVal=document.getElementById("selectGenre").value;
    document.getElementById("filteredSongs").textContent="";
    for(let i=0;i<songsList.length;i++){
         if (songsList[i]["genre"]==dropMenuVal){
            // console.log("ppv");
            
            const songbtn=document.createElement("button");
            songbtn.className="songsFiltered";
            songbtn.textContent=songsList[i]["name"] +"-"+ songsList[i]["artist"];
            document.getElementById("filteredSongs").appendChild(songbtn);
        }
        else if(dropMenuVal=="All"){
            document.getElementById("filteredSongs").textContent="";
            defaultShowSongs();
        }
       
    }
    renderCurrentSong();
       
             
    });
}
const imgVal=document.querySelector(".songImage");
const songVal=document.querySelector("#aud");

function renderCurrentSong(){
    const selectedSongs=document.querySelectorAll(".songsFiltered");
       selectedSongs.forEach(song => {
           
           imgVal.textContent="";
            song.addEventListener("click", () =>{
            for(let i=0;i<songsList.length;i++){
                if(songsList[i]["name"]==song.textContent.split("-")[0]){
                    setSongAttributes(i);
                }
            }
            
      });
       });

}

function setSongAttributes(i){
    imgVal.setAttribute("src", songsList[i]["img"]);
                    imgVal.setAttribute("alt", songsList[i]["name"]);
                    songVal.setAttribute("src", songsList[i]["source"]);
                    document.getElementById("aud").load();
                    document.getElementById("aud").play();
                    document.getElementById("songName").textContent=songsList[i]["name"];
                    document.getElementById("songArtist").textContent=songsList[i]["artist"];
}

const nextorprev=document.getElementsByClassName("optbtn");
for(let i=0;i<nextorprev.length;i++){
    let f=0;
    nextorprev[i].addEventListener("click", ()=>{
        
        if( nextorprev[i].id=="next"){
            
           for(let j=0;j<songsList.length;j++){
            if(songsList[j]["name"]==document.getElementById("songName").textContent){
                
                     f=1;
            }
            else if(f==1){
                setSongAttributes(j);
                f=0;
            }
           }
            
        }
        if( nextorprev[i].id=="prev"){
            
            for(let j=songsList.length-1;j>=0;j--){
             if(songsList[j]["name"]==document.getElementById("songName").textContent){
                 
                      f=1;
             }
             else if(f==1){
                 setSongAttributes(j);
                 f=0;
             }
            }
             
         }
  
    });
}
const playlistinput=document.getElementById("search");
const searchbutton=document.getElementById("searchBtn");

     searchbutton.addEventListener("click", ()=>{
        createPlaylist(); 
    });
   


function createPlaylist(){
    if(playlistinput.value!=""){
        const newPlayList=document.createElement("button");
        newPlayList.className="playListBtn";
        newPlayList.textContent=playlistinput.value;
       //  newPlayList.style.backgroundColor="red";
       //  newPlayList.style.backgroundColor="red";
       //  newPlayList.style.backgroundColor="red";
        playlistinput.value="";
        document.getElementById("allPlaylist").appendChild(newPlayList);
        userPlaylists.push({name:newPlayList.textContent,
                            songs:[],
        });
        console.log(userPlaylists);
        addtoPlaylist();
      }
     
}

function addtoPlaylist(){
    const playList=document.getElementsByClassName("playListBtn");
    // console.log(playList);
    
    console.log(playList.length);
    for(let i=0;i<playList.length;i++){
        // console.log(playList[i]);
        const allPlayList=document.getElementById("allPlaylist");
         playList[i].addEventListener("click", ()=>{
            document.getElementById("currentPlaylist").textContent="";
            showcurrentPlayListSong(playList[i]);
            addSongstoPlaylist(playList[i]);
            //allPlayList.insertBefore(playList[i], allPlayList.firstChild);
         });
    }
}
function showcurrentPlayListSong(playlistname){
    // document.getElementById("currentPlaylist").textContent="";
    for(let k=0;k<userPlaylists.length;k++){
            if(userPlaylists[k]["name"]==playlistname.textContent){
                for(let s=0;s<userPlaylists[k]["songs"].length;s++){
                    const currentPlayListSong=document.createElement("button");
                    currentPlayListSong.className="songsFiltered";
                    currentPlayListSong.textContent=userPlaylists[k]["songs"][s];
                    document.getElementById("currentPlaylist").appendChild(currentPlayListSong);
                }
            }
        }
    
}
const toplaylist=document.getElementById("addToPlayList");
function addSongstoPlaylist(playlistname){
    toplaylist.addEventListener("click",()=>{
       
       for(let i=0;i<songsList.length;i++){
                 if(songsList[i]["name"]==document.getElementById("songName").textContent){
                   
                    for(let j=0;j<userPlaylists.length;j++){
                       
                        if(userPlaylists[j]["name"]==playlistname.textContent){
                           
                            if(userPlaylists[j]["songs"].includes(songsList[i]["name"])==false){
                            userPlaylists[j]["songs"].push(songsList[i]["name"]);
                            document.getElementById("currentPlaylist").textContent="";
                            showcurrentPlayListSong(playlistname);
                            }
                        }
                    }
                 }
       }
});
console.log(userPlaylists);
}

toggleTheme();
showSongs();
// createPlaylist();

