require 'open-uri' 
require 'nokogiri'
require 'csv'

CSV.open('icasas.csv', 'w') {|file| file.truncate(0) }
CSV.open('icasas.csv', 'a') do |csv|
    csv << %w[TITULO PRECIO IMAGEN DESCRIPCION AREA HABITACIONES BANIO LINK] 
end


def save(link)
    CSV.open('icasas.csv', 'a') do |csv|
        html = URI.open(link).read
        parsed_content = Nokogiri::HTML(html) 
        inf_container = parsed_content.css('.listAds')
        inf_container.css('.serp-snippet').each do |publicacion|
            titulo = publicacion.css('.ad-data .data .title a').inner_text
            precio = (publicacion.css('.ad-data .data .price').inner_text.delete! '.$').gsub! /\t/, ''
            
            imagen = publicacion.css('.ad-ph section meta').attr('content')
            descripcion = publicacion.css('.ad-data .data .description').inner_text
            area = ''
            begin
                area = (publicacion.css('.ad-data .data .adCharacteristics .numbers .areaBuilt').inner_text.split('m2',-1)[0])
                area[',']='.'

            rescue
                area = (publicacion.css('.ad-data .data .adCharacteristics .numbers .areaBuilt').inner_text.split('m2',-1)[0])
            end


            habitaciones = publicacion.css('.ad-data .data .adCharacteristics .numbers .rooms').inner_text.to_i
            banio = publicacion.css('.ad-data .data .adCharacteristics .numbers .bathrooms').inner_text.to_i
            link_p = 'https://www.icasas.ec'
            link_p = link_p + publicacion.css('.ad-data .data .title a').attr('href')
            if habitaciones < 1
                habitaciones = 0
            end
            if banio < 1
                banio = 0
            end
            
            csv << [titulo.to_s, precio.to_s, imagen.to_s, descripcion.to_s, area.to_s, habitaciones.to_s, banio.to_s, link_p.to_s]
        end
    end
end




links = [
    {link:'https://www.icasas.ec/arriendo/casas,departamentos,haciendas-quintas,suites/quito/f_5-precio,1-m2', paginas:69},
    {link:'https://www.icasas.ec/arriendo/casas,departamentos,haciendas-quintas,suites/guayaquil/f_5-precio,1-m2', paginas:50},
    {link:'https://www.icasas.ec/arriendo/casas,departamentos,haciendas-quintas,suites/cuenca/f_5-precio,1-m2', paginas:4},
    {link:'https://www.icasas.ec/arriendo/casas,departamentos,haciendas-quintas,suites/samborondon/f_5-precio,1-m2', paginas:9}
    
    ]


for i in links do
    link_p_0 = i[:link]
    save(link_p_0)
    
    
    
    for n in 2..i[:paginas]
        link_p_n = link_p_0 + '/p_' + n.to_s
        save(link_p_n)
    end
    
    
end