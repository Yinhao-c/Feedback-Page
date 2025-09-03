const form=document.getElementById('feedbackForm')
form.addEventListener('submit',async e=>{
    e.preventDefault()
    const email=document.getElementById('email').value.trim()
    const message=document.getElementById('message').value.trim()
    if(!email||!message)return alert('Please fill in both fields.')
    try{
        const res=await fetch('/submit-feedback',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,message})
        })
        const data=await res.json()
        if(data.success){
            alert('Feedback submitted successfully!')
            form.reset()
        }else alert('Error: '+data.message)
    }catch(err){
        console.error(err)
        alert('Server error. Try again later.')
    }
})
