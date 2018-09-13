const sleep = ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function validation(account,password){
  console.log("taking a break");
  data = {'account':account,'password':password};
  fetch('http://localhost:8000',{credential:'same-origin',method:'POST',body:JSON.stringify(data),headers:{'Content-type':'application/json'}})
  .then( res=>res.json())
  .catch(error => console.log('Error': error))
  .then(data=>{return data});
}
