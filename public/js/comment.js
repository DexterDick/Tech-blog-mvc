const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector('#comment-text').value.trim();
  const blogId = document.querySelector('.new-comment-form').dataset.blogid;

  if (commentText) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ blogId, commentText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);
