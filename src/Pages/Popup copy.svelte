<script>
    // import logo from './images/aikido.png';
 
    let currentBlocked = false
    let currentAnInterceptionSite = false
    let enabled = undefined
    let totalTimeSpentLearningData = 0
    let totalIntercepts = 0
 


    // function addStorageListener(() => setup());
    // setup();

//   function setup() {
//     getFromStorage('enabled',  'intercepts',  'timeSpentLearning')
//       .then((res) => {
//       this.setState(typeof res.enabled === 'boolean' ? 
//         res : 
//         { enabled: true });
//         // default value is enabled. will still undefined in storage untill one
//         // turns the switch off.
//         let intercepts = res.intercepts || {};
//         let newTotalIntercepts = Object.values(intercepts).reduce(function(a, b) {
//           return a + b 
//         },0);
        
//         let timeSpentLearning = res.timeSpentLearning || {};
//         let newTotalTimeSpentLearningData = Object.values(timeSpentLearning).reduce(function(a, b) {
//           return a + b 
//         },0);

//         totalIntercepts = newTotalIntercepts
//         totalTimeSpentLearningData = newTotalTimeSpentLearningData
//     });
//     isCurrentWebsiteBlocked().then(newCurrentBlocked => {
//       currentBlocked = newCurrentBlocked;
//     });
//   }

  function onSwitchChangeExtension(newEnabled) {
    enabled = newEnabled;
    setInFirebase({ newEnabled});
    setInStorage({ newEnabled });
    //await 
    setFirebaseData({ enabled });
  }

  function onSwitchChangeWebsite(enabled) {
    if(!enabled){
      blockCurrentWebsite();
    } else{
      unBlockCurrentWebsite();
    }
  }

  function openOptionsPage() {
    if (window.chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.history.pushState({ urlPath: '?page=options' }, '', '?page=options');
      window.location.reload(); // not ideal, but works.
    }
  }

  function convertToMinutesAndSeconds(){
    let hours = Math.floor(totalTimeSpentLearningData / 3600000);
    let minutes = Math.floor((totalTimeSpentLearningData / 60000)%60);
    let seconds = ((totalTimeSpentLearningData % 60000) / 1000).toFixed(0);
    if(hours < 1) {
      return minutes + " min " + seconds + " sec";
    } else {
      return hours + " hours " + minutes + " min " + seconds + " sec";
    }
  }
</script>


<div class="Popup">
        <header class="Popup-header">
        <tr>
           <td span={6}>
             <!-- <img src={logo} class="Popup-logo" alt="logo" /> -->
           </td>
           <td>
              Aiki
           </td>
          </tr>
        </header>
        <tr class="Popup-body">
          <td span={14} class="Popup-settings">
            Settings:
          </td>
          <td span={10} style={{ textAlign: 'center'}}>
            <button type="default" 
              onClick={() => openOptionsPage()}
            />
          </td>
        </tr>
        <tr class="Popup-body">
          <td span={14} >
            Status of extension:
          </td>
          <!-- <td span={10} class="Popup-slider" style={{ textAlign: 'center'}}>
            <Switch
                    loading={this.state.enabled === undefined}
                    checked={this.state.enabled}
                    onChange={checked => this.onSwitchChangeExtension(checked)} 
                    checkedChildren="On" 
                    unCheckedChildren="Off"/>
          </td> -->
        </tr>   
        <tr class="Popup-body">
          <td span={14}>
            Enabled on this site:
          </td>
          <!-- <td span={10} class="Popup-slider" style={{ textAlign: 'center'}} >
            <Switch
                    checked={this.state.currentBlocked}
                    onChange={checked => this.onSwitchChangeWebsite(!checked)} 
                    checkedChildren="Yes" 
                    unCheckedChildren="No"/>
          </td>          -->
        </tr>
        <tr class="Popup-body">
          <td span={14} class="Popup-statistics-title">
            Study sessions: 
          </td>
          <td span={10} class="Popup-statistics">
            {totalIntercepts}
          </td>
        </tr> 
        <tr class="Popup-body-bottom">
          <td span={14} class="Popup-statistics-title">
            Total study time:
          </td>
          <td span={10} class="Popup-statistics">
            {convertToMinutesAndSeconds()}
          </td>
        </tr>      
      </div>