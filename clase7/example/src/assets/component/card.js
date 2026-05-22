const card = ( username, content, posted_at) => {
    return /*html*/
    <div class="card">
        <p>{username}<span>{posted_at}</span></p>
        <p>{content}</p>
    </div>
}

export default Card