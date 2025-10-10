let imageCounter = 1;
let addedTextNode = null;

function changeTextById() {
    const element = document.getElementById('demo-text');
    element.textContent = 'Text changed using getElementById!';
}

function changeTextByTag() {
    const paragraphs = document.getElementsByTagName('p');
    for (let i = 0; i < paragraphs.length; i++) {
        if (paragraphs[i].classList.contains('tag-demo')) {
            paragraphs[i].textContent = 'Changed using getElementsByTagName!';
        }
    }
}

function changeTextByClass() {
    const elements = document.getElementsByClassName('class-demo');
    for (let i = 0; i < elements.length; i++) {
        elements[i].textContent = 'Changed using getElementsByClassName!';
    }
}

function changeCSS() {
    const element = document.getElementById('css-demo');
    element.style.backgroundColor = 'lightblue';
    element.style.color = 'darkblue';
    element.style.position = 'relative';
    element.style.left = '20px';
    element.style.borderRadius = '10px';
    element.textContent = 'CSS properties changed! Color, position, and border radius updated.';
}

function changeImage() {
    const image = document.getElementById('demo-image');
    imageCounter++;
    if (imageCounter > 3) imageCounter = 1;
    
    image.src = `https://picsum.photos/200/150?random=${imageCounter}`;
}

function addTextNode() {
    const parent = document.getElementById('parent-node');
    if (!addedTextNode) {
        addedTextNode = document.createTextNode(' - New text node added!');
        parent.appendChild(addedTextNode);
    }
}

function deleteNode() {
    if (addedTextNode) {
        addedTextNode.remove();
        addedTextNode = null;
    }
}

function changeButtonText() {
    $('#jquery-btn').text('Text changed using jQuery!');
}

function setBackgroundImage() {
    $('#bg-demo').css('background-image', 'url("https://picsum.photos/300/200?random=10")');
    $('#bg-demo').css('background-size', 'cover');
    $('#bg-demo').css('background-position', 'center');
    $('#bg-demo').text('Background image set using jQuery!');
}

function accessFormData() {
    const name = $('#name').val();
    const email = $('#email').val();
    
    if (name && email) {
        $('#form-result').html(`<div class="alert alert-success">Name: ${name}<br>Email: ${email}</div>`);
    } else {
        $('#form-result').html('<div class="alert alert-warning">Please fill in both fields</div>');
    }
}

function addAttribute() {
    $('#attr-demo').attr('data-custom', 'jQuery-added-attribute');
    $('#attr-demo').attr('title', 'This title was added using jQuery');
    $('#attr-demo').attr('class', 'p-3 border bg-light text-primary');
    $('#attr-demo').text('Attributes added using jQuery! Check the element properties.');
}
