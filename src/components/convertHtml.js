import * as cheerio from "cheerio"

export default function convertHtml(html) {
  const $ = cheerio.load(html)
  $("img")
    .unwrap() // Pタグを削除
    .replaceWith((i, e) => {
      const { src, alt, title, width, height } = e.attribs
      // titleがある場合
      if (title)
        return `<figure>
          <img
            src="${src}"
            alt="${alt}" 
            loading="lazy"
            title="${title}"
            width="${width}"
            height="${height}"
            decoding="auto"
           />
          <figcaption>${title}</figcaption>
          </figure>`
      // titleがない場合
      return `<img
          src="${src}"
          alt="${alt}"
          loading="lazy"
          width="${width}"
          height="${height}" 
          decoding="auto"
          />`
    })

  return $.html()
}