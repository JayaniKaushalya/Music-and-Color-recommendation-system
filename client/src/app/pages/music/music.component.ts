import { Component, ElementRef, ViewChild } from '@angular/core';
import { MusicService } from './music.service';
import { musicData2 } from './music-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CaptureService } from '../capture/capture.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {
  @ViewChild('listContainer', { static: false }) listContainer!: ElementRef;



  currentSong: any;
  moodType: any;
  moodTypeURL: any;
  currentSongIndex!: number;
  disablePreviousBtn = false;
  disableNextBtn = false;
  stopSong: any;
  musicPlayerBackgroundColor: any;
  currentSongTitle: any;
  userid = 1;
  finalMusic: any;
  firstName: string = '';
  userID: string = '';
  openChatWindow: boolean = false;
  messageArray = [{
    user: '',
    message: '',
    time: '',
  }];
  messageDisabled: boolean = false;

  firebaseFileList: any;

  romanticMusicList: any[] = [];
  happyMusicList: any[] = [];
  angryMusicList: any[] = [];
  nutralMusicList: any[] = [];
  favouritelist01: any[] = [];
  favouritelist02: any[] = [];
  favouritelist03: any[] = [];
  favouritelist04: any[] = [];


  playlistData: any[] = [];
  colorData: any[] = [];
  randomPlaylist: any;
  randomColor: any;
  selectedColor = '#ffffff';

  favhappy = 0;
  favangry = 0;
  favnutral = 0;
  favromantic = 0;
  role: string = '';
  viewAdmin = false;
  id: any;
  categoryMusicAvailabilityList: any[] = [];

  musicCategories = ['Country Music', 'English Songs', 'Ghibli Songs', 'Hindi Songs', 'Pop Music'];

  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  @ViewChild('audioPlayer1') audioPlayerRef1!: ElementRef;
  @ViewChild('audioPlayer2') audioPlayerRef2!: ElementRef;
  musicStoppedTime: any;

  constructor(private musicService: MusicService, private storage: AngularFireStorage, private route: ActivatedRoute,private captureService: CaptureService) { 
    //////////
    this.route.queryParams.subscribe(params => {
      let expression = params['expression'];
      this.moodType = expression.toLowerCase( )
      console.log('expression :',this.moodType); // Print the parameter to the console. 
    });
    this.id = this.route.snapshot.paramMap.get('expression');
    // console.log('User expression :', this.id);
    // this.moodType = 'happy';

    //get music and color from model AI
    let emotionn = {
      "emotion": this.moodType
    }
    this.musicService.getPlaylistData(emotionn).subscribe(res =>{
      console.log('playlist expression :', res);
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          // console.log(`${key}: ${res[key]}`);
          this.playlistData.push({
            playlist : res[key]
          })
        }
      }
    });
    this.musicService.getColorData(emotionn).subscribe(res =>{
      // console.log('color expression :', res.p1);
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          // console.log(`${key}: ${res[key]}`);
          this.colorData.push({
            color : res[key]
          })
        }
      }
    });
    console.log('music playlist :', this.playlistData);
    // console.log('playlist expression :', playlist2.ZoneAwarePromise.__zone_symbol__value);

    //get files from firebase
    this.getRomanticFileList();
    this.getHappyFileList();
    this.getHyperFileList();
    this.getCalmFileList();

    setTimeout(() => {
      console.log('wait 3 seconds')
      this.getUserMusic();
      this.randomPlaylist = this.playlistData[Math.floor(Math.random() * this.playlistData.length)];
      this.randomColor = this.colorData[Math.floor(Math.random() * this.colorData.length)];
      console.log('music playlist :', this.randomPlaylist);
      console.log('colordata :',);
      const color = this.randomColor.color;

      if(color == 'Happy Color') {
        this.selectedColor = 'video1';
      } else if(color == 'Relax Color') {
        this.selectedColor = 'video3';
      }else if(color == 'Hyper Color') {
        this.selectedColor = 'video5';
      } else {
        this.selectedColor = 'video7';
      } 
    }, 3000);

    console.log('this.categoryMusicAvailabilityList :', this.categoryMusicAvailabilityList)


    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user._id === null || user._id === undefined) {
      window.location.href = '/pages/auth';
    }
    this.userID = user._id;
    this.firstName = user.first_name;
    this.role = user.role;
    if(user.role === 'Admin'){
      this.viewAdmin = true;
    }
    if(user.role === 'user'){   
      this.viewAdmin = false;
    }

    //get user music list
    this.disablePreviousBtn = true;

    // if (this.moodType === 'happy') {
    //   this.moodTypeURL = "./assets/video/relax1.mp4";
    //   this.musicPlayerBackgroundColor = '#fcba03';
    // } else if (this.moodType === 'sad') {
    //   this.moodTypeURL = "./assets/video/relax1.mp4";
    // } else if (this.moodType === 'angry') {
    //   this.moodTypeURL = "./assets/video/relax1.mp4";
    // } else {
    //   this.moodTypeURL = "./assets/video/relax1.mp4";
    // }
  }

  getUserMusic2() {
    //get files from firebase
    this.getRomanticFileList();
    this.getHappyFileList();
    this.getHyperFileList();
    this.getCalmFileList();

    setTimeout(() => {
      console.log('wait 3 seconds')
      this.getUserMusic();
      this.randomPlaylist = this.playlistData[Math.floor(Math.random() * this.playlistData.length)];
      this.randomColor = this.colorData[Math.floor(Math.random() * this.colorData.length)];
      const color = this.randomColor.color;
      if(color == 'Happy Color') {
        this.selectedColor = 'video1';
      } else if(color == 'Relax Color') {
        this.selectedColor = 'video3';
      }else if(color == 'Hyper Color') {
        this.selectedColor = 'video5';
      } else {
        this.selectedColor = 'video7';
      } 
    }, 3000);
  }


  getUserMusic() {
    let data = {
      user_id: this.userid
    }
    this.musicService.getUserData(data).subscribe(res => {
      var music = JSON.parse(JSON.stringify(res));
      console.log('user favourite music : ', music.data);

      //check Availability for angry
      for (let s = 0; s < this.angryMusicList.length; s++) {
        var name1 = this.angryMusicList[s].title;
        // console.log('name1 :', name1);
        var checkHyperAvailable = music.data.find((e: any) => {
          if (e.title === name1) {
            return e._id;
          } else {
            return false;
          }
        });
        if (checkHyperAvailable === true) {
          this.angryMusicList[s]['is_favourite'] = 'true';
          this.angryMusicList[s]['id'] = checkHyperAvailable._id;
          this.favangry = 0 + 1;
        } 
      }
      //check Availability for happy
      for (let s = 0; s < this.happyMusicList.length; s++) {
        //get name from database
        var name1 = this.happyMusicList[s].title;
        var checkHappyAvailable = music.data.find((e: any) => {
          if (e.title === name1) {
            return e._id;
          } else {
            return false;
          }
        });
        if (checkHappyAvailable) {
          // console.log('check available :', checkHappyAvailable)
          this.happyMusicList[s]['is_favourite'] = 'true';
          this.happyMusicList[s]['id'] = checkHappyAvailable._id;
          this.favhappy = 0 + 1;
        }
      }
      //check Availability for calm
      for (let s = 0; s < this.nutralMusicList.length; s++) {
        var name1 = this.nutralMusicList[s].title;
        // console.log('name1 :', name1);
        var checkHNutralAvailable = music.data.find((e: any) => {
          if (e.title === name1) {
            return e._id;
          } else {
            return false;
          }
        });
        if (checkHNutralAvailable === true) {
          this.nutralMusicList[s]['is_favourite'] = 'true';
          this.nutralMusicList[s]['id'] = checkHNutralAvailable._id;
          this.favnutral = 0 + 1;
        } 
      }
      //check Availability for romance
      for (let s = 0; s < this.romanticMusicList.length; s++) {
        var name1 = this.romanticMusicList[s].title;
        var checkRomanticAvailable = music.data.find((e: any) => {
          if (e.title === name1) {
            return e._id;
          } else {
            return false;
          }
        });
        if (checkRomanticAvailable) {
          this.romanticMusicList[s]['is_favourite'] = 'true';
          this.romanticMusicList[s]['id'] = checkRomanticAvailable._id;
          this.favromantic = 0 + 1;
        }
      }

      if (this.moodType === 'happy') {
        this.finalMusic = this.happyMusicList;
      } else if (this.moodType === 'romantic') {
        this.finalMusic = this.romanticMusicList;
      } else if (this.moodType === 'nutral') {
        this.finalMusic = this.nutralMusicList;
      } else {
        this.finalMusic = this.angryMusicList;
      }
     // this.currentSong = this.finalMusic['0'].location;
      this.currentSongIndex = 0;
      this.currentSongTitle = this.finalMusic['0'].title;
      // for (let p = 0; p < this.musicData1.length; p++) {
      //   this.musicData1[p]['emotion_type'] = this.moodType;
      // }
      console.log('final music :', this.finalMusic);
      console.log('this.happyMusicList :', this.happyMusicList);

    })
  }

  clickMusic(y: any, section: any) {
    console.log('clicked music index :', y);
    var clickedSong;
    if (section === 'playlist') {
      clickedSong = this.finalMusic.at(y);
    } else if (section === 'happy') {
      clickedSong = this.happyMusicList.at(y);
    } else if (section === 'romantic') {
      clickedSong = this.romanticMusicList.at(y);
    } else if (section === 'angry') {
      clickedSong = this.angryMusicList.at(y);
    } else if (section === 'nutral') {
      clickedSong = this.nutralMusicList.at(y);
    }
    // var clickedSong = this.finalMusic.at(y);
    this.currentSongIndex = y;
    this.currentSong = clickedSong?.location;
    this.currentSongTitle = clickedSong?.title;
    console.log('clicked music location:', this.currentSong);

  }

  clickFavourite(y: any, music: any, section: any) {
    var clickedSong2;
    if (section === 'playlist') {
      clickedSong2 = this.finalMusic.at(y);
    } else if (section === 'happy') {
      clickedSong2 = this.happyMusicList.at(y);
    } else if (section === 'romantic') {
      clickedSong2 = this.romanticMusicList.at(y);
    } else if (section === 'angry') {
      clickedSong2 = this.angryMusicList.at(y);
    } else if (section === 'nutral') {
      clickedSong2 = this.nutralMusicList.at(y);
    }
    var clickedID = music.id;
    console.log('clicked clickedID :', clickedSong2.is_favourite);
    console.log('clicked favourite song :', music);
    var favStatus = clickedSong2?.is_favourite;

    if (favStatus === 'true') {
      console.log('clicked favourite song true');
      if (section === 'playlist') {
        this.finalMusic[y]['is_favourite'] = 'false';
      } else if (section === 'happy') {
        this.happyMusicList[y]['is_favourite'] = 'false';
      } else if (section === 'romantic') {
        this.romanticMusicList[y]['is_favourite'] = 'false';
      } else if (section === 'angry') {
        this.angryMusicList[y]['is_favourite'] = 'false';
      } else if (section === 'nutral') {
        this.nutralMusicList[y]['is_favourite'] = 'false';
      }
      let data1 = {
        id: clickedSong2.id,
        user_id: this.userid
      }
      this.musicService.deleteMusic(data1).subscribe(res => {
        console.log('delete music result :', res);
        this.getUserMusic();
      });
    } else {
      console.log('clicked favourite song false');
      if (section === 'playlist') {
        this.finalMusic[y]['is_favourite'] = 'true';
      } else if (section === 'happy') {
        this.happyMusicList[y]['is_favourite'] = 'true';
      } else if (section === 'romantic') {
        this.romanticMusicList[y]['is_favourite'] = 'true';
      } else if (section === 'angry') {
        this.angryMusicList[y]['is_favourite'] = 'true';
      } else if (section === 'nutral') {
        this.nutralMusicList[y]['is_favourite'] = 'true';
      }
      let data1 = {
        music_type: clickedSong2.music_type,
        title: clickedSong2.title,
        location: clickedSong2.location,
        is_favourite: clickedSong2.is_favourite,
        emotion_type: clickedSong2.emotion_type,
        user_id: this.userid,
        category: clickedSong2.category
      }
      this.musicService.createMusic(data1).subscribe(res => {
        console.log('create music result :', res);
        this.getUserMusic();
      });
    }
  }

  clickNext() {
    this.currentSongIndex = this.currentSongIndex + 1;
    //get song details of next index
    console.log('click previous song', this.currentSongIndex, 'music length :', this.finalMusic.length);
    if (this.currentSongIndex + 1 >= this.finalMusic.length) {
      this.disableNextBtn = true;
    } else {
      this.disableNextBtn = false;
    }
    if (this.currentSongIndex == 0) {
      this.disablePreviousBtn = true;
    } else {
      this.disablePreviousBtn = false;
    }
    var clickedSong3 = this.finalMusic.at(this.currentSongIndex);
    this.currentSong = clickedSong3?.location;
    this.currentSongTitle = clickedSong3?.title;
    console.log('click next song', clickedSong3);
  }

  clickPrevious() {
    this.currentSongIndex = this.currentSongIndex - 1;
    console.log('current index when click prevoius', this.currentSongIndex)
    if (this.currentSongIndex == 0) {
      this.disablePreviousBtn = true;
    } else {
      this.disablePreviousBtn = false;
    }
    var clickedSong4 = this.finalMusic.at(this.currentSongIndex);
    this.currentSong = clickedSong4?.location;
    this.currentSongTitle = clickedSong4?.title;
    console.log('click previous song', clickedSong4);
  }

  goDashboard() {
    window.location.href = '/pages/capture';
  }


  logOut() {
    sessionStorage.setItem('user', "");
    window.location.href = '/pages/auth';
  }

  openChat() {
    this.openChatWindow = !this.openChatWindow;
  }

  sendMessage() {
    let message = this.chatForm.value.message;
    if (message === '' || message === undefined || message === null) {
      return;
    }
    let time = new Date().toLocaleTimeString();
    this.messageArray.push({ user: 'you', message: message, time: time });
    this.chatForm.reset();
    this.messageDisabled = true;
    const data = {
      msg: message,
    }
    this.captureService.sendMessage(data).toPromise().then((res: any) => {
      console.log('res : ', res);
      time = new Date().toLocaleTimeString();
      this.messageDisabled = false;
      this.messageArray.push({ user: 'bot', message: res.msg, time: time });
      const listContainerElement = this.listContainer.nativeElement;
      listContainerElement.scrollTop = listContainerElement.scrollHeight;
    }, (err: any) => {
      console.log('err : ', err);
    });
  }

  clickFullScreenModel() {
    const audioPlayer1: HTMLAudioElement = this.audioPlayerRef1.nativeElement;
    audioPlayer1.pause();
    this.musicStoppedTime = audioPlayer1.currentTime;
    audioPlayer1.src = this.currentSong;
    const audioPlayer2: HTMLAudioElement = this.audioPlayerRef2.nativeElement;
    audioPlayer1.pause();
    audioPlayer2.src = this.currentSong;
    audioPlayer2.currentTime = this.musicStoppedTime;
    audioPlayer2.load();
    audioPlayer2.play();
  }

  clickCloseFullScreen() {
    const audioPlayer2: HTMLAudioElement = this.audioPlayerRef2.nativeElement;
    audioPlayer2.pause();
    this.musicStoppedTime = audioPlayer2.currentTime;
    audioPlayer2.src = this.currentSong;
    const audioPlayer1: HTMLAudioElement = this.audioPlayerRef1.nativeElement;
    audioPlayer2.pause();
    audioPlayer1.src = this.currentSong;
    audioPlayer1.currentTime = this.musicStoppedTime;
    audioPlayer1.load();
    audioPlayer1.play();
  }


  async getRomanticFileList() {
    for (let e = 0; e < this.musicCategories.length; e++) {
      let musicCat = this.musicCategories[e];
      const ref = this.storage.ref(`Romantic Songs/${musicCat}`);
      ref.listAll().subscribe(async (data) => {
        for (let i = 0; i < data.items.length; i++) {
          var name = data.items[i].name;
          let newref = this.storage.ref(`Romantic Songs/${musicCat}/${data.items[i].name}`);
          let url = await newref.getDownloadURL().toPromise();
          this.romanticMusicList.push({
            music_type: 'romantic',
            title: name,
            location: url,
            is_favourite: 'false',
            id: '',
            emotion_type: 'romantic',
            category: musicCat
          });
        }
        this.categoryMusicAvailabilityList.push({
          header: `Romantic Songs/${musicCat}`,
          count: data.items.length
        });
      });
    }

  }

  async getHappyFileList() {
    for (let e = 0; e < this.musicCategories.length; e++) {
      // console.log('this.musicCategories', this.musicCategories[e]);
      let musicCat = this.musicCategories[e];
      let ref = this.storage.ref(`Happy Songs/${musicCat}`);
      ref.listAll().subscribe(async (data) => {
        for (let i = 0; i < data.items.length; i++) {
          var name = data.items[i].name;
          let newref = this.storage.ref(`Happy Songs/${musicCat}/${data.items[i].name}`);
          let url = await newref.getDownloadURL().toPromise();
          this.happyMusicList.push({
            music_type: 'happy',
            title: name,
            location: url,
            is_favourite: 'false',
            id: '',
            emotion_type: 'happy',
            category: musicCat
          });
        }
        this.categoryMusicAvailabilityList.push({
          header: `Happy Songs/${musicCat}`,
          count: data.items.length
        });
      });
    }
  }

  async getHyperFileList() {
    for (let e = 0; e < this.musicCategories.length; e++) {
      let musicCat = this.musicCategories[e];
      const ref = this.storage.ref(`Hyper Songs/${musicCat}`);
      ref.listAll().subscribe(async (data) => {
        for (let i = 0; i < data.items.length; i++) {
          var name = data.items[i].name;
          let newref = this.storage.ref(`Hyper Songs/${musicCat}/${data.items[i].name}`);
          let url = await newref.getDownloadURL().toPromise();
          this.angryMusicList.push({
            music_type: 'hyper',
            title: name,
            location: url,
            is_favourite: 'false',
            id: '',
            emotion_type: 'hyper',
            category: musicCat
          });
        }
        this.categoryMusicAvailabilityList.push({
          header: `Hyper Songs/${musicCat}`,
          count: data.items.length
        });
      });
    }

  }

  async getCalmFileList() {
    for (let e = 0; e < this.musicCategories.length; e++) {
      let musicCat = this.musicCategories[e];
      const ref = this.storage.ref(`Calm Songs/${musicCat}`);
      ref.listAll().subscribe(async (data) => {
        for (let i = 0; i < data.items.length; i++) {
          var name = data.items[i].name;
          let newref = this.storage.ref(`Calm Songs/${musicCat}/${data.items[i].name}`);
          let url = await newref.getDownloadURL().toPromise();
          this.nutralMusicList.push({
            music_type: 'calm',
            title: name,
            location: url,
            is_favourite: 'false',
            id: '',
            emotion_type: 'calm',
            category: musicCat
          });
        }
        this.categoryMusicAvailabilityList.push({
          header: `Calm Songs/${musicCat}`,
          count: data.items.length
        });
      });
    }

  }

}
