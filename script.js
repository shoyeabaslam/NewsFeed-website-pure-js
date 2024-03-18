const getNewsData = async () => {
    const res = await fetch('https://ok.surf/api/v1/cors/news-feed');
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    if (!res.ok) {
        throw new Error("error occured");
    }
    else {
        loader.style.display = 'none';
        const data = await res.json();
        return data;
    }
}

// pre display
async function displayWorldNews() {
    const data = await getNewsData();
    const filteredData = data[`World`];
    const mainBannerContentImage = document.querySelector('.left-div div img');
    const anchorTag = document.querySelector('.left-div');
    anchorTag.href = filteredData[0].link;
    mainBannerContentImage.src = filteredData[0].og;
    const mainBannerHeading = document.querySelector('.left-div h4');
    mainBannerHeading.innerText = filteredData[0].title;
    addRightDivContent(filteredData)
    newsContent(filteredData)
}
displayWorldNews();

// get ul elements as child
const navList = document.querySelectorAll('ul li')

navList.forEach((li) => {
    li.addEventListener('click', (e) => {
        updateDom(e.target.innerText);
    })
})


async function updateDom(text) {
    const data = await getNewsData();
    const filteredData = data[`${text}`];
    const mainHeading = document.querySelector('h1');
    mainHeading.innerText = text;
    console.log(filteredData)
    const mainBannerContentImage = document.querySelector('.left-div img');
    mainBannerContentImage.src = filteredData[0].og;
    const mainBannerHeading = document.querySelector('.left-div h4');
    mainBannerHeading.innerText = filteredData[0].title;
    addRightDivContent(filteredData)
    newsContent(filteredData)

}

function addRightDivContent(data) {
   
    let rightDivContent = document.querySelector('.right-div');
    rightDivContent.innerHTML = '';
    for (let i = 1; i < 4; i++) {
        let anchorTag = document.createElement('a');
        anchorTag.href = data[i].link
        anchorTag.classList.add('right-div_content');
        let image = document.createElement('img');
        image.src = data[i].og;
        anchorTag.appendChild(image);
        let div = document.createElement('div');
        let h4 = document.createElement('h4');
        h4.innerText = data[i].title;
        let button = document.createElement('button');
        button.innerText = 'Read Article';
        div.appendChild(h4);
        div.appendChild(button);
        anchorTag.appendChild(div);
        rightDivContent.appendChild(anchorTag)
    }
}

//news-content_wrapper

function newsContent(data) {
    //<a class="news_card">
    //    <div>
    //        <img class="bg-image" src="images/2.jpg" />
    //    </div>
    //    <h4>This is heading</h4>
    //    <img class="icon" src="images/1.jpg" />
    //</a>
    let news_content_wrapper = document.querySelector('.news_content_wrapper');
    news_content_wrapper.innerHTML = '';
    for (let i = 4; i < data.length; i++) {
        let anchorTag = document.createElement('a');
        anchorTag.classList.add('news_card')
        anchorTag.href = data[i].link;
        anchorTag.target = '_blank'
        //div
        let divTag = document.createElement('div');
        let imageTag = document.createElement('img');
        imageTag.classList.add('bg-image');
        imageTag.src = data[i].og;
        divTag.appendChild(imageTag);
        //h4
        let h4Tag = document.createElement('h4');
        h4Tag.innerText = data[i].title;
        //icon
        let iconTag = document.createElement('img');
        iconTag.src = data[i].source_icon;
        iconTag.classList.add('icon');
        //appending to anchor tag
        anchorTag.appendChild(divTag);
        anchorTag.appendChild(h4Tag);
        anchorTag.appendChild(iconTag);
        news_content_wrapper.appendChild(anchorTag);


    }
}