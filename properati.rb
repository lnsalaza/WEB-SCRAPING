require 'open-uri' # consultar a la plataforma
require 'nokogiri' # formatear, parsear a html
require 'csv' # escribir y leer csv

link = 'https://www.properati.com.ec/s/casa/alquiler?page=#1'
dataHTML = URI.open(link)
parsed = Nokogiri::HTML(dataHTML.read)
entriesPerPage = 30
totalEntries = parsed.css('.page-counter').inner_text.split(' ')[4].to_i
pages = (totalEntries / entriesPerPage)

def properati(link, tipo, filename)
  dataHTML = URI.open(link)
  parsed = Nokogiri::HTML(dataHTML.read)
  houseList = parsed.css('.Xbqhe')
  houseList.css('.comlbB').each do |house|
    @name = house.css('.jGXOiG .cSLJrQ').inner_text
    @price = house.css('.jGXOiG .hQvubf').inner_text

    @location = ''
    locationArray = house.css('.jGXOiG .dxIVBd').inner_text.split(',')
    locationArray.each do |loc|
      @location += loc == locationArray[-1] ? loc.to_s.strip : "#{loc.strip}/"
    end

    @details = ''
    detailsArray = house.css('.jGXOiG .kbmWJE span')
    detailsArray.each do |detail|
      @details += detail == detailsArray[-1] ? detail.inner_text : "#{detail.inner_text}/"
    end

    @seller = house.css('.jGXOiG .seller-name').inner_text
    @publicationDate = house.css('.jGXOiG .hFXCBX').inner_text
    @detailurl = house.css('.jGXOiG a').attr('href')
    @detailLink = "https://www.properati.com.ec#{@detailurl}"

    CSV.open(filename, 'a') do |csv|
      csv << [tipo, @name, @price, @location, @details, @seller, @publicationDate, @detailLink]
    end
  end
end

def escribirCSV(filename, type, pages)
  CSV.open(filename, 'w') do |csv|
    csv << ['tipo', 'nombre', 'precio', 'localización', 'detalles', 'vendedor', 'fecha de publicación', 'link']
  end

  (1..pages).each do |_i|
    link = "https://www.properati.com.ec/s/casa/#{type}?page=#{_i}"
    properati(link, type.capitalize, filename)
  end
end

escribirCSV('properatiAlquiler.csv', 'alquiler', pages)
escribirCSV('properatiVenta.csv', 'venta', 50)

puts 'Scraping completo.'
