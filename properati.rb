require 'open-uri' # consultar a la plataforma
require 'nokogiri' # formatear, parsear a html
require 'csv' # escribir y leer csv


page = 1
link = "https://www.properati.com.ec/s/casa/alquiler?page=#{page}"
dataHTML = URI.open(link)
parsed = Nokogiri::HTML(dataHTML.read)
entriesPerPage = 30
totalEntries = parsed.css('.page-counter').inner_text.split(' ')[4].to_i
pages = (totalEntries / entriesPerPage)



def properati(link)
  dataHTML = URI.open(link)
	parsed = Nokogiri::HTML(dataHTML.read)
	houseList = parsed.css('.Xbqhe')
	houseList.css('.gxrAFy').each do |house|
		@name = house.css('.jGXOiG .cSLJrQ').inner_text
		@price = house.css('.jGXOiG .hQvubf').inner_text
		@location = ''
		house.css('.jGXOiG .dxIVBd').inner_text.split(',').each do |loc|
			@location += "#{loc};"
		end
		@detailsArray = ''
		house.css('.jGXOiG .kbmWJE span').each do |details|
			@detailsArray += "#{details.inner_text};"
		end
		@seller = house.css('.jGXOiG .seller-name').inner_text
		@publicationDate = house.css('.jGXOiG .hFXCBX').inner_text
		@detailurl = house.css('.jGXOiG a').attr('href')
		@detailLink = "https://www.properati.com.ec#{@detailurl}"

		CSV.open('properati.csv', 'a') do |csv|
	    csv << [@name, @price, @location, @detailsArray, @seller, @publicationDate]
  	end
	end
end

CSV.open('properati.csv', 'w') do |csv|
	csv << ['nombre', 'precio', 'localización', 'detalles', 'vendedor', 'fecha de publicación', 'link']
end
for i in 1..pages do
	link = "https://www.properati.com.ec/s/casa/alquiler?page=#{page}"
	properati(link)
	page+=1
end

puts 'Scraping completo.'
