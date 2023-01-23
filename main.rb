require 'open-uri'
require 'nokogiri'
require 'csv'

CSV.open('inmobiliaria.csv', 'wb') do |csv|
  csv << %w[TITULO PRECIO IMAGEN DESCRIPCION AREA HABITACIONES LINK]
  conf = 0; pagina = 1
  while conf < 100
    puts 'Scrapeando'
    link = 'https://inmuebles.mercadolibre.com.ec/casas/'
    confiesaloHTML = open(link)
    datos = confiesaloHTML.read
    parsed_content = Nokogiri::HTML(datos)
    inf_container = parsed_content.css('.ui-search-results')
    inf_container.css('.ui-search-layout__item').each do |inmuebles|
      header = inmuebles.css('div div.andes-card').css('a.ui-search-result__content').css('div')
      titulo = header.css('.ui-search-item__group--title').css('span.ui-search-item__subtitle').inner_text[0..-1]

      price = header.css('.ui-search-item__group--price').css('span').css('span.price-tag-text-sr-only').inner_text[0..-1].split(' ')[0]

      imagen = inmuebles.css('div div.andes-card').css('a.ui-search-result__image').css('a div div div div img').attr('src')

      link = inmuebles.css('div div.andes-card').css('a.ui-search-result__content').attr('href')

      atributos = header.css('.ui-search-item__group--attributes').css('ul').inner_text[0..-1].split('cubiertos')
      extension = atributos[0]
      habs = atributos[1]

      ubicacion = header.css('.ui-search-item__group--location').css('span').inner_text[0..-1]

      csv << [titulo.to_s, price.to_s, imagen.to_s, ubicacion.to_s, extension.to_s, habs.to_s, link.to_s]
      conf += 1
    end
    pagina += 1
  end
  puts 'Fin de Extracción'
end
