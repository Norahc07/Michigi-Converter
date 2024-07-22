document.getElementById('convert-button').addEventListener('click', function() {
    const videoUrl = document.getElementById('video-url').value;
    const format = document.getElementById('format').value;
    const loadingElement = document.getElementById('loading');
    const resultElement = document.getElementById('result');
    const previewElement = document.getElementById('preview');
    const downloadLinkElement = document.getElementById('download-link');

    if (!videoUrl) {
        alert('Please enter a YouTube URL');
        return;
    }

    loadingElement.style.display = 'block';
    resultElement.style.display = 'none';
    previewElement.style.display = 'none';

    fetch(`/convert?url=${encodeURIComponent(videoUrl)}&format=${format}`)
        .then(response => response.blob())
        .then(blob => {
            loadingElement.style.display = 'none';
            resultElement.style.display = 'block';

            const url = URL.createObjectURL(blob);
            if (format === 'mp4') {
                previewElement.src = url;
                previewElement.style.display = 'block';
            }

            downloadLinkElement.href = url;
            downloadLinkElement.innerText = `Download ${format.toUpperCase()}`;
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            alert('Error converting video');
        });
});
