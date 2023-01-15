require 'open-uri'
require 'nokogiri'
require 'csv'

CSV.open('confesiones.csv', 'wb') do |csv| # uso de gema csv para escribir sobre archivo confesiones.csv
  csv << %w[Nro precio extension habs titutlo ubicacion]
  conf = 0; pagina = 1
  while conf < 100 # se obtiene la pagina web y su estructura html, en la ultima iteracion conf obtiene un valor mayor a 100 antes de volver a preguntar en el while, porque cada vez que se hace el requerimiento se entregan todas las confesiones de la pagina actual, creando que se exceda el valor
    puts 'Scrapeando'
    link = 'https://inmuebles.mercadolibre.com.ec/casas/'
    confiesaloHTML = open(link) # uso de gema open uri para navegar por protocolo http al link del parametro
    datos = confiesaloHTML.read
    parsed_content = Nokogiri::HTML(datos) # crea documento Nokogiri con gema nokogiri
    inf_container = parsed_content.css('.ui-search-results') # extrae las etiquetas que contengan la clase infinite-container
    inf_container.css('.ui-search-layout__item').each do |inmuebles| # extra etiquetas con clase infinite-item y las recorre con un foreach
      header = inmuebles.css('div div.andes-card').css('a.ui-search-result__content').css('div') #

      price = header.css('.ui-search-item__group--price').css('span').css('span.price-tag-text-sr-only').inner_text[0..-1].split(' ')[0]

      atributos = header.css('.ui-search-item__group--attributes').css('ul').inner_text[0..-1].split('cubiertos')
      extension = atributos[0]
      habs = atributos[1]

      titulo = header.css('.ui-search-item__group--title').css('span.ui-search-item__subtitle').inner_text[0..-1]

      ubicacion = header.css('.ui-search-item__group--location').css('span').inner_text[0..-1]

      csv << [conf.to_s, price.to_s, extension.to_s, habs.to_s, titulo.to_s, ubicacion.to_s]
      conf += 1 # aumenta el numero de confesiones leidas
      # puts id.class
    end
    pagina += 1
  end
  puts 'Fin de Extracción'
end
