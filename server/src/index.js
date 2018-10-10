import {parsePost, parseLinks, fetchPosts} from './parsePosts';
import { elems } from './configs';
// const Post = parsePost(
// 	'https://korrespondent.net/ukraine/4009816-v-kyeve-otvetyly-na-uprek-kremlia-po-zakluichennym',
// 	elems.korrespondent
// );

// (async () => {
// 	let post = await parsePost(
// 		'https://korrespondent.net/ukraine/4009816-v-kyeve-otvetyly-na-uprek-kremlia-po-zakluichennym',
// 		elems.korrespondent
// 	);

// 	console.log(post);
	
// })();



//parsePost('https://www.segodnya.ua/regions/dnepr/zaderzhanie-izvestnogo-blogera-policiya-dnepra-dala-oficialnye-kommentarii-1169965.html', elems.segodnya);


parseLinks('https://ua.korrespondent.net/', '.article_rating .article__title a')
.then(links => {
	fetchPosts(links);
});


