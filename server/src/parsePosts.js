import unirest from "unirest";
import cheerio from "cheerio";
import { elems } from './configs';
import fs from 'fs';

async function parsePost(url, elems) {
	return new Promise( (resolve, reject) => {
		unirest.get(url)
			.end((res) => {
				const body =  res.body;
				const domain = url.match(/\/\/(.*?)\//)[1];
				const $ =  cheerio.load(body);
				const title  =  $(elems.title).text().trim();
				let image = $(elems.image).attr('src');
				image = image.indexOf('http') >= 0 ? image
							:
							`http://${domain}${ image}`;
				const text = $(elems.text).text().trim();
				const views = $(elems.views).text().trim();
				
				const post = {
					title,
					image,
					text,
					views,
				}
				
				resolve(post);
			});
	});
}

function parseLinks(url, className, maxLinks = 5) {
	return new Promise((resolve, reject) => {
		let links = [];

		unirest.get(url)
		.end((res) => {
			const body = res.body;
			const $ = cheerio.load(body);

			$(className).each((index, e) => {
				if(index + 1 <= maxLinks) links.push($(e).attr('href'));
			});

			resolve(links);
			
			if(!links.length) return reject(new Error('Ссылки не найдены'));
		});
	});
	
}

async function fetchPosts(links) {
		try{
			let posts = [];
			for( let i=0; i < links.length; i++){
				let post = await parsePost(
					links[i],
					elems.korrespondent
				);
				posts.push(post);		
			}
			const json = JSON.stringify(posts);
			fs.writeFile('posts.json', json, (err) => {
				if(err) return new Error(`Ошибка записи файла: ${err}`)
			});
			
		}catch(error){
			console.error(`Ошибка получения данных: ${error}`);
		}
}

export {
	parsePost,
	parseLinks,
	fetchPosts
}
	