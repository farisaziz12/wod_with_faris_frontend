(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},102:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(20),c=a.n(r),o=(a(54),a(2)),l=a(3),i=a(4),u=a(5),m=(a(55),a(12)),h=a(44),d=(a(58),h.initializeApp({apiKey:"AIzaSyAYF6CkdEYcdp7Nj6Xb-qfddApF8y4TrTQ",authDomain:"wod-with-faris.firebaseapp.com",databaseURL:"https://wod-with-faris.firebaseio.com",projectId:"wod-with-faris",storageBucket:"156551100887",messagingSenderId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_FIREBASE_KEY:"AIzaSyAYF6CkdEYcdp7Nj6Xb-qfddApF8y4TrTQ",REACT_APP_FIREBASE_DOMAIN:"wod-with-faris.firebaseapp.com",REACT_APP_FIREBASE_DATABASE:"https://wod-with-faris.firebaseio.com",REACT_APP_FIREBASE_PROJECT_ID:"wod-with-faris",REACT_APP_FIREBASE_STORAGE_BUCKET:"156551100887",REACT_APP_GOOGLE_MEASUREMENT_ID:"UA-162899429-1"}).REACT_APP_FIREBASE_SENDER_ID,measurementId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_FIREBASE_KEY:"AIzaSyAYF6CkdEYcdp7Nj6Xb-qfddApF8y4TrTQ",REACT_APP_FIREBASE_DOMAIN:"wod-with-faris.firebaseapp.com",REACT_APP_FIREBASE_DATABASE:"https://wod-with-faris.firebaseio.com",REACT_APP_FIREBASE_PROJECT_ID:"wod-with-faris",REACT_APP_FIREBASE_STORAGE_BUCKET:"156551100887",REACT_APP_GOOGLE_MEASUREMENT_ID:"UA-162899429-1"}).REACT_APP_MEASUREMENT_ID})),p=(a(60),a(15)),f=a.n(p),E=(a(75),a(8)),g=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props,t=e.show,a=e.toggleShow;return s.a.createElement("div",null,s.a.createElement(f.a,{position:"centerCenter",open:t,closeBtn:!0,closeOnEsc:!0,onClose:function(){return a(!1)},closeOnOverlay:!0},s.a.createElement("h1",{className:"schedule-title"},"Schedule"),s.a.createElement("div",{className:"schedule-container"},s.a.createElement("h3",{className:"schedule-h3"},"Classes with less than 2 people will be cancelled 2 hours before class start time"),s.a.createElement("p",null,s.a.createElement("strong",null,"Monday:")," None"),s.a.createElement("p",null,s.a.createElement("strong",null,"Tuesday:")," Workout of the Day @ 18:30"),s.a.createElement("p",null,s.a.createElement("strong",null,"Wednesday:")," Core360 @ 18:30"),s.a.createElement("p",null,s.a.createElement("strong",null,"Thursday:")," Workout of the Day @ 18:30"),s.a.createElement("p",null,s.a.createElement("strong",null,"Friday:")," None"),s.a.createElement("p",null,s.a.createElement("strong",null,"Saturday:")," Mobility Class @ 11:00"),s.a.createElement("p",null,s.a.createElement("strong",null,"Sunday:")," Workout of the Day @ 15:00"),s.a.createElement(E.b,{to:"/classes"},s.a.createElement("button",{className:"class-link"},"Book a Class")))))}}]),a}(n.Component),C=a(9),v=a(78);var b=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={currentUser:e.props.currentUser,instaPosts:[],showSchedule:!1},e.toggleShow=function(t){e.setState({showSchedule:t})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;C.a.initialize("UA-162899429-1"),C.a.pageview("/home"),d.auth().onAuthStateChanged((function(e){e&&t(e)}));var t=function(t){e.setState({currentUser:t}),e.props.setUser(t)};v.profile("faziz_training").then((function(t){e.setState({instaPosts:t})}))}},{key:"render",value:function(){var e=this,t=this.state.instaPosts,a=t[0]?t.slice(0,8):[];return s.a.createElement(s.a.Fragment,null,s.a.createElement("button",{onClick:function(){return e.toggleShow(!0)},className:"class-schedule-btn"},"View Class Schedule"),s.a.createElement(g,{show:this.state.showSchedule,toggleShow:this.toggleShow}),s.a.createElement("div",{className:"posts-container"},s.a.createElement("h2",{className:"title"},"Recent Posts ",s.a.createElement("a",{className:"title",href:"https://www.instagram.com/faziz_training/",target:"_blank"},"@faziz_training")),s.a.createElement("div",{className:"posts-container"},a.map((function(e){return s.a.createElement("a",{href:"https://www.instagram.com/p/".concat(e.node.shortcode,"/"),target:"_blank"},s.a.createElement("img",{id:"insta-post",className:"insta-post",src:e.node.display_url}))})))))}}]),a}(n.Component),w=a(48),S=a(47),k=s.a.createContext();function N(e){var t=e.children,a=Object(n.useState)(null),r=Object(S.a)(a,2),c=r[0],o=r[1];return Object(n.useEffect)((function(){d.auth().onAuthStateChanged(o)}),[]),s.a.createElement(k.Provider,{value:{currentUser:c}},t)}function O(e){var t=e.component,a=Object(w.a)(e,["component"]),r=Object(n.useContext)(k).currentUser;return s.a.createElement(m.b,Object.assign({},a,{render:function(e){return r?s.a.createElement(t,Object.assign({},e,{currentUser:r})):s.a.createElement(m.a,{to:"/login"})}}))}var y=a(10),j=a(17),_=a.n(j),A=a(21);a(42);var T=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={currentUser:null,email:null,password:null,show:!1,passwordResetEmail:null,emailSent:!1},e.handlelogin=Object(A.a)(_.a.mark((function t(){var a,n,s;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.state,n=a.email,s=a.password,t.prev=1,t.next=4,d.auth().signInWithEmailAndPassword(n,s);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),alert(t.t0);case 9:case"end":return t.stop()}}),t,null,[[1,6]])}))),e.toggleShow=function(t){e.setState({show:t})},e.handleChange=function(t){e.setState(Object(y.a)({},t.target.name,t.target.value))},e.handlePasswordResetEmailChange=function(t){e.setState(Object(y.a)({},t.target.name,t.target.value))},e.sendPasswordResetEmail=function(t){d.auth().sendPasswordResetEmail(t).then(e.setState({emailSent:!0}))},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;C.a.initialize("UA-162899429-1"),C.a.pageview("/login"),d.auth().onAuthStateChanged((function(e){e&&t(e)}));var t=function(t){e.setState({currentUser:t}),e.props.setUser(t)}}},{key:"render",value:function(){var e=this,t=this.state,a=t.currentUser,n=t.show,r=t.passwordResetEmail,c=t.emailSent;return a?s.a.createElement(m.a,{to:"/"}):s.a.createElement("div",null,s.a.createElement("div",{className:"form-structor"},s.a.createElement("div",{className:"signup"},s.a.createElement("h2",{className:"form-title",id:"signup"},s.a.createElement("span",null,"or"),"Log In"),s.a.createElement("div",{className:"form-holder"},s.a.createElement("input",{onChange:this.handleChange,name:"email",type:"email",className:"input",placeholder:"Email"}),s.a.createElement("input",{onChange:this.handleChange,name:"password",type:"password",className:"input",placeholder:"Password"})),s.a.createElement("button",{onClick:this.handlelogin,className:"submit-btn"},"Log In"),s.a.createElement("h3",{onClick:this.toggleShow,className:"forgot-password"},s.a.createElement("u",null,"Forgot Password")),s.a.createElement(f.a,{position:"centerCenter",open:n,closeBtn:!0,closeOnEsc:!0,onClose:function(){return e.toggleShow(!1)},closeOnOverlay:!0},s.a.createElement("div",{className:"forgot-password-modal-container"},s.a.createElement("h2",{className:"forgot-password-txt"},"Password Reset"),c&&s.a.createElement("p",{className:"email-send-success"},"Email Sent!"),s.a.createElement("p",{className:"forgot-password-txt"},"Please enter the email associated with your account:"),s.a.createElement("input",{value:r,onChange:this.handlePasswordResetEmailChange,name:"passwordResetEmail",className:"forgot-password-input",type:"email"}),s.a.createElement("button",{onClick:function(){return e.sendPasswordResetEmail(r)},className:"forgot-password-btn"},"Send Password Reset Email")))),s.a.createElement("div",{className:"login slide-up"},s.a.createElement("div",{className:"center"},s.a.createElement(E.c,{to:"/signup"},s.a.createElement("h2",{className:"form-title",id:"login"},s.a.createElement("span",null,"or"),"Sign Up"))))))}}]),a}(s.a.Component),D=Object(m.f)(T);var P=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={firstName:null,lastName:null,email:null,password:null,passwordConfirm:null,currentUser:null,passwordMatchError:"",emailSent:!1,emptyFieldsError:null},e.handleSignUp=Object(A.a)(_.a.mark((function t(){var a,n,s,r,c,o;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.state,n=a.email,s=a.password,r=a.passwordConfirm,c=a.firstName,o=a.lastName,t.prev=1,s!==r||null===n){t.next=9;break}return t.next=5,d.auth().createUserWithEmailAndPassword(n,s);case 5:e.setState({passwordMatchError:null,emptyFieldsError:null}),fetch("https://wod-with-faris.herokuapp.com/user/create",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:e.state.email,first_name:e.state.firstName,last_name:e.state.lastName,tokens:1,coach:!1})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})),t.next=10;break;case 9:s&&r&&n&&c&&o?e.setState({passwordMatchError:"Passwords do not match",emptyFieldsError:null}):e.setState({emptyFieldsError:"Please fill all the fields",passwordMatchError:null});case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),alert(t.t0);case 15:case"end":return t.stop()}}),t,null,[[1,12]])}))),e.handleChange=function(t){e.setState(Object(y.a)({},t.target.name,t.target.value))},e.handleSetUser=function(t){e.setState({currentUser:t})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;C.a.initialize("UA-162899429-1"),C.a.pageview("/signup"),d.auth().onAuthStateChanged((function(e){e&&t(e)}));var t=function(t){e.setState({currentUser:t})}}},{key:"render",value:function(){var e=this.state,t=e.currentUser,a=e.emailSent,n=e.passwordMatchError,r=e.emptyFieldsError;return t?(t.emailVerified||a||(t.sendEmailVerification(),this.setState({emailSent:!0})),s.a.createElement(m.a,{to:"/"})):s.a.createElement("div",null,s.a.createElement("div",{className:"form-structor"},s.a.createElement("div",{className:"signup"},n&&s.a.createElement("p",{className:"sign-up-error"},n),r&&s.a.createElement("p",{className:"sign-up-error"},r),s.a.createElement("h2",{className:"form-title",id:"signup"},s.a.createElement("span",null,"or"),"Sign up"),s.a.createElement("div",{className:"form-holder"},s.a.createElement("form",null,s.a.createElement("input",{onChange:this.handleChange,name:"firstName",type:"text",className:"input",placeholder:"First Name"}),s.a.createElement("input",{onChange:this.handleChange,name:"lastName",type:"text",className:"input",placeholder:"Last Name"}),s.a.createElement("input",{onChange:this.handleChange,name:"email",type:"email",className:"input",placeholder:"Email"}),s.a.createElement("input",{onChange:this.handleChange,name:"password",type:"password",className:"input",placeholder:"Password"}),s.a.createElement("input",{onChange:this.handleChange,name:"passwordConfirm",type:"password",className:"input",placeholder:"Confirm Password"}))),s.a.createElement("button",{onClick:this.handleSignUp,className:"submit-btn"},"Sign up")),s.a.createElement("div",{className:"login slide-up"},s.a.createElement("div",{className:"center"},s.a.createElement(E.c,{to:"/login"},s.a.createElement("h2",{className:"form-title",id:"login"},s.a.createElement("span",null,"or"),"Log in"))))))}}]),a}(s.a.Component),U=Object(m.f)(P),R=(a(99),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={page:null},e.handleActiveBtnChange=function(t){"/profile"===t.target.name||"/classes"===t.target.name?e.props.currentUser?e.setState({page:t.target.name}):e.setState({page:"/login"}):e.setState({page:t.target.name})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.setState({page:window.location.pathname})}},{key:"render",value:function(){var e=this.state.page,t=this.props,a=t.currentUser,n=t.userData;return s.a.createElement("div",{className:"nav-bar"},s.a.createElement(E.c,{to:"/"},s.a.createElement("button",{onClick:this.handleActiveBtnChange,name:"/",className:"/"===e?"nav-btn active":"nav-btn"},"Home")),a&&n&&n.coach&&s.a.createElement(E.c,{to:"/createclass"},s.a.createElement("button",{onClick:this.handleActiveBtnChange,name:"/createclass",className:"/createclass"===e?"nav-btn active":"nav-btn"},"Create Class")),a&&n&&n.coach&&s.a.createElement(E.c,{to:"/clients"},s.a.createElement("button",{onClick:this.handleActiveBtnChange,name:"/clients",className:"/clients"===e?"nav-btn active":"nav-btn"},"Clients")),a&&n&&!n.coach&&s.a.createElement(E.c,{to:"/classes"},s.a.createElement("button",{onClick:this.handleActiveBtnChange,name:"/classes",className:"/classes"===e?"nav-btn active":"nav-btn"},"Book Class")),a&&s.a.createElement(E.c,{to:"/profile"},s.a.createElement("button",{onClick:this.handleActiveBtnChange,name:"/profile",className:"/profile"===e?"nav-btn active":"nav-btn"},"Profile")),a?s.a.createElement("button",{className:"nav-btn",onClick:this.props.logout},"Log Out"):s.a.createElement(E.c,{to:"/login"},s.a.createElement("button",{onClick:this.handleActiveBtnChange,name:"/login",className:"/login"===e?"nav-btn active":"nav-btn"},"Log In")),s.a.createElement("h3",{className:"logo-2"},"WOD WITH FARIS"))}}]),a}(n.Component)),M=(a(19),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=this.props,t=e.handleChange,a=e.date,n=e.handleOffset;return s.a.createElement("div",{className:"date-picker-container"},s.a.createElement("span",{onClick:function(){return n(-1)}},s.a.createElement("i",{className:"i left"})),s.a.createElement("input",{onChange:t,value:a,className:"date-picker",type:"date",name:"date"}),s.a.createElement("span",{onClick:function(){return n(1)}},s.a.createElement("i",{className:"i right"})))}}]),a}(n.Component)),x=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={show:!1,clients:[],error:null},e.toggleShow=function(t){e.setState({show:t,error:null})},e.handleBookandUnBookClass=function(t){var a=e.state.clients.find((function(t){return t.user.id===e.props.user.id}));void 0===a&&e.props.user.tokens>0&&e.state.clients.length<8?(console.log("booking"),fetch("https://wod-with-faris.herokuapp.com/usersession/book",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user_id:e.props.user.id,session_id:t})}).then((function(e){return e.json()})).then((function(t){return e.setState({clients:t,error:null})})).then(e.props.deductToken)):a&&e.props.user.tokens>=0?fetch("https://wod-with-faris.herokuapp.com/usersession/unbook",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user_id:e.props.user.id,session_id:t})}).then((function(e){return e.json()})).then((function(t){return e.setState({clients:e.state.clients.filter((function(e){return e.user.id!==t.user.id})),error:null})})).then(e.props.addToken):e.props.user.tokens<=0?e.setState({error:"Sorry, you have run out of tokens"}):8===e.state.client.length&&e.setState({error:"Sorry, this class is fully booked"})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://wod-with-faris.herokuapp.com/usersessions?class_id=".concat(this.props.oneClass.id),{}).then((function(e){return e.json()})).then((function(t){return e.setState({clients:t})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.show,n=t.clients,r=t.error,c=this.props.oneClass,o=n[0]&&n.find((function(t){return t.user.id===e.props.user.id})),l=new Date,i=new Date(c.date+"T"+c.time)<l;return s.a.createElement("div",null,s.a.createElement("button",{class:"class-btn",onClick:function(){return e.toggleShow(!0)}},c.time+" "+c.name),s.a.createElement(f.a,{position:"centerCenter",open:a,closeBtn:!0,closeOnEsc:!0,onClose:function(){return e.toggleShow(!1)},closeOnOverlay:!0},s.a.createElement("h1",{className:"workout-title"},c.time+" "+c.name)," ",s.a.createElement("div",{className:"attending-progress-bar"},s.a.createElement("div",{style:{width:"".concat((n.length/8*100).toFixed(2),"px")},className:"inner-progress-bar"},s.a.createElement("span",{className:"attending-txt"},8===n.length?"Fully Booked":n.length+" / 8"))),s.a.createElement("h3",{className:"desc-txt"},s.a.createElement("strong",null,"Coach: "),c.coach.first_name+" "+c.coach.last_name),c.description.split("\n").map((function(e){return s.a.createElement("p",{className:"desc-txt"},e)})),i?s.a.createElement("button",{class:"past-btn"},"Already Passed"):s.a.createElement("button",{onClick:function(){return e.handleBookandUnBookClass(e.props.oneClass.id)},class:"book-btn"},o?"Cancel":"Book Class"),r&&s.a.createElement("p",{className:"error"},this.state.error)))}}]),a}(n.Component);var B=new Date,F=B.getDate(),I=B.getMonth()+1;F<10&&(F="0"+F),I<10&&(I="0"+I);var L=B.getFullYear()+"-"+I+"-"+F,z=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={classes:[],date:L,chosenClass:null,user:null,isLoading:!0},e.handleDateChange=function(t){var a;e.setState((a={},Object(y.a)(a,t.target.name,t.target.value),Object(y.a)(a,"isLoading",!0),a)),e.dateFetch(t.target.value)},e.handlePickClass=function(t){var a=e.state.classes.find((function(e){return e.id===t}));e.setState({chosenClass:a})},e.deductToken=function(){var t=e.state.user;e.setState({user:{id:t.id,coach:t.coach,first_name:t.first_name,last_name:t.last_name,email:t.email,tokens:t.tokens-1}})},e.addToken=function(){var t=e.state.user;e.setState({user:{id:t.id,coach:t.coach,first_name:t.first_name,last_name:t.last_name,email:t.email,tokens:t.tokens+1}})},e.dateFetch=function(t){fetch("https://wod-with-faris.herokuapp.com/sessions?date=".concat(t)).then((function(e){return e.json()})).then((function(t){return e.setState({classes:t,isLoading:!1})}))},e.handleDayOffset=function(t){var a=new Date(e.state.date),n=new Date(a.setDate(a.getDate()+t)).toISOString().slice(0,10);e.setState({date:n}),e.dateFetch(n)},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;C.a.initialize("UA-162899429-1"),C.a.pageview("/classes"),fetch("https://wod-with-faris.herokuapp.com/sessions?date=".concat(this.state.date)).then((function(e){return e.json()})).then((function(t){return e.setState({classes:t,isLoading:!1})})),fetch("https://wod-with-faris.herokuapp.com/user/getuser?email=".concat(this.props.currentUser.email)).then((function(e){return e.json()})).then((function(t){return e.setState({user:t})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.date,n=t.classes,r=t.isLoading,c=n.filter((function(e){return e.date===a}));return s.a.createElement("div",null,s.a.createElement("h1",null,"Book Class"),s.a.createElement(M,{handleOffset:this.handleDayOffset,date:a,handleChange:this.handleDateChange}),s.a.createElement("div",{className:"container"},r&&s.a.createElement("button",{className:"loading"}),n[0]?c.map((function(t){return s.a.createElement(x,{addToken:e.addToken,deductToken:e.deductToken,user:e.state.user,oneClass:t,handlePickClass:e.handlePickClass})})):!r&&s.a.createElement("h1",null,"No Classes")))}}]),a}(n.Component),W=(a(100),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).handleCancelBooking=function(t){fetch("https://wod-with-faris.herokuapp.com/usersession/unbook",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user_id:e.props.user.id,session_id:t})}).then((function(e){return e.json()})).then((function(t){return e.props.handleCancel(t)})).then(e.props.addToken)},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.props.upcomingClass;return s.a.createElement("div",{className:"class-card"},s.a.createElement("h2",{className:"card-title"},t.time+" "+t.name),s.a.createElement("p",{className:"card-date"},t.date),s.a.createElement("button",{onClick:function(){return e.handleCancelBooking(t.id)},className:"book-btn"},"Cancel"))}}]),a}(n.Component)),J=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={show:!1,clients:[],askDeleteConfirm:!1,editMode:!1,classDescription:e.props.upcomingClass.description},e.handleDeleteClass=function(t){fetch("https://wod-with-faris.herokuapp.com/sessions/deleted/".concat(t),{method:"DELETE"}).then((function(e){return e.json()})).then((function(t){return e.props.handleCancel(t)}));var a=e.state.clients.map((function(e){return e.user.id}));fetch("https://wod-with-faris.herokuapp.com/sessions/returntokens",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({client_ids:a})}).then(e.setState({askDeleteConfirm:!1}))},e.toggleShow=function(t){e.setState({show:t,tokenError:null})},e.toggleDeleteConfirm=function(){e.setState({askDeleteConfirm:!e.state.askDeleteConfirm})},e.toggleEditMode=function(){e.setState({editMode:!e.state.editMode})},e.handleChange=function(t){e.setState(Object(y.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){fetch("https://wod-with-faris.herokuapp.com/sessions/update/".concat(t),{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({description:e.state.classDescription})}).then(e.setState({editMode:!1}))},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://wod-with-faris.herokuapp.com/usersessions?class_id=".concat(this.props.upcomingClass.id),{}).then((function(e){return e.json()})).then((function(t){return e.setState({clients:t})}))}},{key:"render",value:function(){var e=this,t=this.props.upcomingClass,a=this.state,n=a.show,r=a.clients,c=a.askDeleteConfirm,o=a.editMode,l=a.classDescription;return s.a.createElement("div",{className:"coach-class-card"},s.a.createElement("h2",{className:"card-title"},t.time+" "+t.name),s.a.createElement("p",{className:"card-date"},t.date),c?s.a.createElement("div",null," ",s.a.createElement("button",{onClick:function(){return e.handleDeleteClass(t.id)},className:"book-btn"},"Confirm Delete")," ",s.a.createElement("button",{onClick:this.toggleDeleteConfirm,className:"book-btn"},"Cancel Delete")," "):s.a.createElement("button",{onClick:this.toggleDeleteConfirm,className:"book-btn"},"Delete Class"),c?void 0:s.a.createElement("button",{onClick:function(){return e.toggleShow(!0)},className:"book-btn"},"More Info"),s.a.createElement(f.a,{position:"centerCenter",open:n,closeBtn:!0,closeOnEsc:!0,onClose:function(){return e.toggleShow(!1)},closeOnOverlay:!0},s.a.createElement("h1",{className:"workout-title"},t.time+" "+t.name)," ",s.a.createElement("div",{className:"attending-progress-bar"},s.a.createElement("div",{style:{width:"".concat((r.length/8*100).toFixed(2),"px")},className:"inner-progress-bar"},s.a.createElement("span",{className:"attending-txt"},8===r.length?"Fully Booked":r.length+" / 8"))),s.a.createElement("h3",{className:"desc-txt"},s.a.createElement("strong",null,"Coach: "),t.coach.first_name+" "+t.coach.last_name),o?s.a.createElement("textarea",{className:"edit-desc",value:l,onChange:this.handleChange,name:"classDescription"}):l.split("\n").map((function(e){return s.a.createElement("p",{className:"desc-txt"},e)})),s.a.createElement("div",null,o?s.a.createElement("button",{className:"book-btn",onClick:function(){return e.handleSubmit(t.id)}},"Submit"):s.a.createElement("button",{className:"book-btn",onClick:this.toggleEditMode},"Edit Workout"),s.a.createElement("h3",{className:"desc-txt"},"Signed  Up Clients"),r.map((function(e){return s.a.createElement("p",{className:"desc-txt"},"- ",e.user.first_name+" "+e.user.last_name)})),!r[0]&&s.a.createElement("p",{className:"desc-txt"},"None"))))}}]),a}(n.Component);var K=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={user:null,upcomingClasses:[],showGetClassPasses:!1},e.addToken=function(){var t=e.state.user;e.setState({user:{id:t.id,coach:t.coach,first_name:t.first_name,last_name:t.last_name,email:t.email,tokens:t.tokens+1}})},e.handleCancel=function(t){e.setState({upcomingClasses:e.state.upcomingClasses.filter((function(e){return e.id!==t.session.id}))})},e.handleDelete=function(t){e.setState({upcomingClasses:e.state.upcomingClasses.filter((function(e){return e.id!==t.id}))})},e.toggleShow=function(t){e.setState({showGetClassPasses:t})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;C.a.initialize("UA-162899429-1"),C.a.pageview("/profile"),fetch("https://wod-with-faris.herokuapp.com/user/getuser?email=".concat(this.props.currentUser.email)).then((function(e){return e.json()})).then((function(t){return e.setState({user:t})})),fetch("https://wod-with-faris.herokuapp.com/usersession/upcomingclasses?email=".concat(this.props.currentUser.email)).then((function(e){return e.json()})).then((function(t){return e.setState({upcomingClasses:t})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.user,n=t.upcomingClasses,r=(t.showGetClassPasses,n[0]&&n.sort((function(e,t){return new Date(e.date)-new Date(t.date)})).slice(0,4));return s.a.createElement("div",null,s.a.createElement("div",{className:"profile-container"},a?s.a.createElement(s.a.Fragment,null,s.a.createElement("h1",null,a.first_name+" "+a.last_name),!a.coach&&s.a.createElement("h2",{className:"tokens"},"Class Passes: ",a.tokens),s.a.createElement("div",{className:"upcoming-classes-container"},s.a.createElement("h2",{className:"upcoming-classes-title"},"Upcoming Classes: "),!a.coach&&n[0]&&r.map((function(t){return s.a.createElement(W,{handleCancel:e.handleCancel,addToken:e.addToken,user:e.state.user,upcomingClass:t})})),a.coach&&n[0]&&r.map((function(t){return s.a.createElement(J,{handleCancel:e.handleDelete,user:e.state.user,upcomingClass:t})})),!n[0]&&s.a.createElement("h3",{className:"none"},"None"))):s.a.createElement("button",{className:"loading"})))}}]),a}(n.Component),G=(a(101),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={name:null,description:null,date:null,time:null,coach:null,success:!1,errorMessage:null},e.handleChange=function(t){e.setState(Object(y.a)({},t.target.name,t.target.value))},e.handleCreateClass=function(){var t=e.state,a=t.name,n=t.description,s=t.date,r=t.time,c=t.coach;a&&n&&s&&r?fetch("https://wod-with-faris.herokuapp.com/sessions/create",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:a,description:n,date:s,time:r,user_id:c.id})}).then((function(e){return e.json()})).then(e.setState({success:!0,errorMessage:null,name:"",description:"",date:"",time:""})).catch((function(t){return e.setState({errorMessage:t})})):e.setState({errorMessage:"Please fill all fields"})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://wod-with-faris.herokuapp.com/user/getuser?email=".concat(this.props.currentUser.email)).then((function(e){return e.json()})).then((function(t){return e.setState({coach:t})}))}},{key:"render",value:function(){var e=this.state,t=e.success,a=e.errorMessage;return s.a.createElement("div",null,s.a.createElement("h1",{className:"create-class-title"},"Create Class"),t&&s.a.createElement("h2",{className:"success"},"Class Created!"),a&&s.a.createElement("h2",{className:"error-message"},a),s.a.createElement("div",{className:"create-class-div"},s.a.createElement("h3",{className:"create-class-h3"},"Name"),s.a.createElement("input",{name:"name",onChange:this.handleChange,className:"create-class-input",type:"text"}),s.a.createElement("h3",{className:"create-class-h3"},"Description"),s.a.createElement("textarea",{name:"description",onChange:this.handleChange,className:"create-class-textarea"}),s.a.createElement("h3",{className:"create-class-h3"},"Date"),s.a.createElement("input",{name:"date",onChange:this.handleChange,className:"create-class-input",type:"date"}),s.a.createElement("h3",{className:"create-class-h3"},"Time"),s.a.createElement("input",{name:"time",onChange:this.handleChange,className:"create-class-input",type:"time"}),s.a.createElement("button",{className:"create-class-btn",onClick:this.handleCreateClass},"Create Class")))}}]),a}(n.Component)),Y=(a(43),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={show:!1,editMode:!1,email:e.props.client.email,tokens:e.props.client.tokens},e.toggleShow=function(t){e.setState({show:t})},e.toggleEditMode=function(){e.setState({editMode:!0})},e.handleChange=function(t){e.setState(Object(y.a)({},t.target.name,t.target.value))},e.submitEdit=function(t){fetch("https://wod-with-faris.herokuapp.com/user/update/".concat(t),{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:e.state.email,tokens:e.state.tokens})}).then(e.setState({editMode:!1}))},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.props.client,a=this.state,n=a.show,r=a.email,c=a.tokens,o=a.editMode;return s.a.createElement("div",null,s.a.createElement("h3",{onClick:this.toggleShow,className:"client"},t.first_name+" "+t.last_name),s.a.createElement(f.a,{position:"centerCenter",open:n,closeBtn:!0,closeOnEsc:!0,onClose:function(){return e.toggleShow(!1)},closeOnOverlay:!0},s.a.createElement("div",{className:"client-modal-container"},s.a.createElement("h3",{className:"client-txt"},t.first_name+" "+t.last_name),s.a.createElement("p",{className:"client-txt"},"Email: ")," ",o?s.a.createElement("input",{onChange:this.handleChange,className:"edit-input",value:r,name:"email"}):s.a.createElement("p",{className:"client-txt"},r),s.a.createElement("p",{className:"client-txt"},"Class Passes: ")," ",o?s.a.createElement("input",{onChange:this.handleChange,className:"edit-input",type:"number",value:c,name:"tokens"}):s.a.createElement("p",{className:"client-txt"},c),o?s.a.createElement("button",{onClick:function(){return e.submitEdit(t.id)},className:"edit-btn"},"Submit"):s.a.createElement("button",{onClick:this.toggleEditMode,className:"edit-btn"},"Edit"))))}}]),a}(n.Component)),H=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={search:null,allClients:[]},e.handleSearch=function(t){var a=t.target.value;a.length>0?e.setState({search:a}):0===a.length&&e.setState({search:null})},e.fuzzyMatch=function(e,t){if(0===t.length)return 1;for(var a=e.toLowerCase(),n=t.toLowerCase(),s=0,r=0;r<n.length;r++)a.indexOf(n[r])>-1?s+=1:s-=1;return s/e.length},e.sortSearch=function(t){var a=t.map((function(t){return[t,e.fuzzyMatch(t.first_name+" "+t.last_name,e.state.search)]}));return a.sort((function(e,t){return t[1]-e[1]})),a.filter((function(e){return e[1]>0}))},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://wod-with-faris.herokuapp.com/users/index").then((function(e){return e.json()})).then((function(t){return e.setState({allClients:t})}))}},{key:"render",value:function(){var e=this.state,t=e.allClients,a=e.search,n=t.sort((function(e,t){return e.last_name.localeCompare(t.last_name)}));console.log(n);var r=a?this.sortSearch(t):n;return s.a.createElement("div",null,s.a.createElement("h1",null,"Clients"),s.a.createElement("input",{className:"search-bar",onChange:this.handleSearch,name:"search",type:"text"}),s.a.createElement("div",{className:"clients-container"},t&&t[0]&&r.map((function(e){return s.a.createElement(Y,{client:a?e[0]:e})})),t&&!t[0]&&s.a.createElement("h2",null,"None")))}}]),a}(n.Component);var V=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={currentUser:null,userData:null},e.handleSetUser=function(t){e.setState({currentUser:t}),fetch("https://wod-with-faris.herokuapp.com/user/getuser?email=".concat(t.email)).then((function(e){return e.json()})).then((function(t){return e.setState({userData:t})}))},e.handleLogout=function(){d.auth().signOut(),e.setState({currentUser:null})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){C.a.initialize("UA-162899429-1"),C.a.pageview("/")}},{key:"render",value:function(){var e=this.state,t=e.currentUser,a=e.userData;return s.a.createElement(s.a.Fragment,null,s.a.createElement(R,{userData:a,logout:this.handleLogout,currentUser:t}),s.a.createElement(O,{exact:!0,path:"/classes",component:z}),s.a.createElement(O,{exact:!0,path:"/profile",component:K}),s.a.createElement(O,{exact:!0,path:"/createclass",component:G}),s.a.createElement(O,{exact:!0,path:"/clients",component:H}),s.a.createElement(m.b,{exact:!0,path:"/"},s.a.createElement(b,{setUser:this.handleSetUser})),s.a.createElement(m.b,{exact:!0,path:"/login"},s.a.createElement(D,{setUser:this.handleSetUser})),s.a.createElement(m.b,{exact:!0,path:"/signup",component:U}))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(N,null,s.a.createElement(E.a,null,s.a.createElement(V,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},19:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},49:function(e,t,a){e.exports=a(102)},54:function(e,t,a){},55:function(e,t,a){},60:function(e,t,a){},75:function(e,t,a){},99:function(e,t,a){}},[[49,1,2]]]);
//# sourceMappingURL=main.70b1869f.chunk.js.map