const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')
let Client = require('node-rest-client').Client;
let client = new Client();
let JSONPath = require('jsonpath-plus');
let search = require('youtube-search');
const MovieDB = require('moviedb')('d791b226b58525f4f6c803f09892d1b9'); // FIXME: Don't hardcode api key
const translate = require('translate-api');
const removeA = require('remove-accents')

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'clima',
    'execute': async (msg) => {
      let apiKey = process.env.OPEN_WEATHER_KEY
      let city = utils.getMessage(msg)

      if(!city) return msg.channel.send("Dame algo para buscar, pendejo");
      let ciudad = removeA(city)
      
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
      let params = {'url': url, 'json': true}
      clients.request(params)
      .then(weather => {
        let reply = new message.BaseMessage(msg)
        reply.setTitle(`Clima en ${weather.name}`)
        reply.addField("Temperatura", `${weather.main.temp}°C`,true)
        reply.addField("Presión", `${weather.main.pressure} hPa`,true)
        reply.addField("Humedad", `${weather.main.humidity}%`,true)
        reply.addField("Viento", `${weather.wind.speed} km/h`,true)
        reply.addField("Clima", `${weather.weather[0].description}`,true)
        reply.addField("Pais", `${weather.sys.country}`,true)
        reply.setColor(utils.randomColors())
        reply.setTimestamp()
        msg.channel.send(reply)
      })
      .catch(e => {
        utils.sendText(msg, 'No pude encontrar nada con esa ciudad :c')
      })

    }
  }),

  new CustomCommand({
    'name': 'lolinfo',
    'execute': async (msg) => {
      let searchTerm = utils.getMessage(msg)

      if(!searchTerm) return msg.channel.send("Dame a alguien para buscar, pendejo");

      let apikey = process.env.RIOT_API_KEY

      let url_id_summoner = `https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/${searchTerm}?api_key=${apikey}`
      let get_id_summoner = {'url': url_id_summoner,'json':true}
      let info = await clients.request(get_id_summoner)

      let summonerId = info.id;
      let summonerIconId = info.profileIconId;
      let summonerIcon = `http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/${summonerIconId}.png`
      let level = info.summonerLevel;
      let urlMastery = `https://la2.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerId}?api_key=${apikey}`
      let get_mastery_summoner = {'url': urlMastery, 'json':true}
      let infos = await clients.request(get_mastery_summoner)

      var masteryLevel = "Sin Informacion"
      var masteryPoints = "Sin Informacion"
      var championId = "Sin Informacion"
      var championName = "Sin Informacion"
      var championDescription = "Sin Informacion"
      if(infos.length > 0) {
        masteryLevel = infos[0].championLevel
        masteryPoints = infos[0].championPoints
        championId = infos[0].championId

        let url_champion_name = `https://la2.api.riotgames.com/lol/static-data/v3/champions/${championId}?locale=es_AR&api_key=${apikey}`
        let get_champion_name = {'url': url_champion_name,'json': true}
        let moreInfo = await clients.request(get_champion_name)
        championName = moreInfo.name
        championDescription = moreInfo.title
      }

      let reply = new message.BaseMessage(msg)
      reply.setTitle(`Informacion de ${searchTerm}`)
      reply.setThumbnail(summonerIcon)
      reply.addField("Nivel de Invocador",`${level}`)
      reply.addField("Campeon con más maestria",`${championName} *${championDescription}*`)
      reply.addField("Nivel / Puntos de maestria",`${masteryLevel} / ${masteryPoints}`)
      reply.setColor(0x74D92D)
      msg.channel.send(reply)
    }
  }),

  new CustomCommand({
    'name': 'musica',
    'execute': async (msg) => {
    
    // Get the message

    let searchTerm = utils.getMessage(msg)
    
    // Validations

    if(!searchTerm) return msg.channel.send("Dame algo para buscar, pendejo");

    // Apikey and URL for search of music

    let apikey = process.env.TASTEDIVE_API_KEY
    let url = `https://tastedive.com/api/similar?q=${searchTerm}&k=${apikey}&type=music`;

    // Save the response to a JSON

    let getResult = {'url': url,'json':true}

    // Get the response from the API

    let info = await clients.request(getResult);

    // Validation of response

    if(info.Similar.Info[0].Type === "unknown") return msg.channel.send("No pude encontrar nada con eso :(")
     
    // Get all the results from the query

    let allResults = JSONPath({json: info, path: "$.Similar.Results[*].Name"});

    // Counts the number of results

    let contResults = allResults.length;

    // With the results gets to a random number for the search

    let randomNumber = Math.floor((Math.random() * contResults) + 1) - 1;

    // Gets all the data gathered and do the search with the number of the array

    let result = JSONPath({json: info, path: `$.Similar.Results[${randomNumber}].Name`});

    var opts = {
      maxResults: 1,
      key: process.env.YOUTUBE_API_KEY
    };
    
    search(result, opts, function(err, results) {
      if(err) return console.log(err);
      
      let reply = new message.BaseMessage(msg)
      reply.setTitle(`Artistas similares a ${searchTerm}`)
      reply.setThumbnail(results[0].thumbnails.medium.url)
      reply.addField("Puedes escuchar este Artista",`[${result}](${results[0].link})`)
      reply.addField("Te recomiendo esta cancion! 🎵")
      reply.setColor(0x74D92D)
      msg.channel.send(reply)
    });
    }
  }),

  new CustomCommand({
    'name': 'pelicula',
    'execute': async (msg) => {
    
    // Get the message

    let searchTerm = utils.getMessage(msg)
    
    // Validations
    if(!searchTerm){
       msg.delete(3000);
       msg.channel.send("Dame algo para buscar, pendejo").then(msg =>{msg.delete(4000)});
       return
    } 
    // Apikey and URL for search of a movie

    let apikey = process.env.TASTEDIVE_API_KEY
    let url = `https://tastedive.com/api/similar?q=${searchTerm}&k=${apikey}&type=movie&verbose=1`;

    // Save the response to a JSON

    let getResult = {'url': url,'json':true}

    // Get the response from the API

    let info = await clients.request(getResult);

    // Validation of response

    if(info.Similar.Info[0].Type === "unknown"){
      msg.delete(3000);
      msg.channel.send("No pude encontrar nada con eso :(").then(msg =>{msg.delete(4000)});
      return
    }
    
    // Get all the results from the query

    let allResults = JSONPath({json: info, path: "$.Similar.Results[*].Name"});

    // Counts the number of results

    let contResults = allResults.length;

    // With the results gets to a random number for the search

    let randomNumber = Math.floor((Math.random() * contResults) + 1) - 1;

    // Gets all the data gathered and do the search with the number of the array

    let result = JSONPath({json: info, path: `$.Similar.Results[${randomNumber}].Name`});

    let ytId = JSONPath({json: info,path: `$.Similar.Results[${randomNumber}].yID`});
    let movieLink = `https://www.youtube.com/watch?v=${ytId}`

    // Begins the search of a movie

    MovieDB.searchMovie({ query: result }, (err, res) => 
      {
        // Translate the description of the movie

        let transText = res.results[0].overview;

        translate.getText(transText,{to: 'es'}).then(function(text){

          // Gets the poster image, language, and the release date of the movie

          let poster = `https://image.tmdb.org/t/p/w500${res.results[0].poster_path}`
          let language = res.results[0].original_language;
          let release = res.results[0].release_date;

          // Starts the embed send with all the data
          
          let reply = new message.BaseMessage(msg)

          reply.setTitle(`Peliculas similares a ${searchTerm}`)
          reply.setThumbnail(poster)
          reply.addField("🎥 Puedes mirar esta pelicula 🎥",`${result}`,true)
          reply.addField("🍿 ¿De que se trata? 🍿",text.text,true)
          reply.addField("📖 Idioma original 📖",language,true)
          reply.addField("📅 Fecha de lanzamiento",release,true)
          reply.addField("🎦 Trailer 🎦",`Haz click [Aqui](${movieLink}) para ver el tailer de la pelicula!`,true)
          reply.setColor(0x74D92D)
          msg.channel.send(reply)
        });
      });
    }
  }),

  new CustomCommand({
    'name': 'r34',
    'nsfw': true,
    'execute' : async (msg) =>{
      let searchTerm = utils.getMessage(msg)

      if(!searchTerm) return msg.channel.send("Dame algo para buscar, pendejo");

      // Parse the Spaces to a _ for the search
      let parsed = searchTerm.replace(" ","_");

      client.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${parsed}`, function (data, response) {
      // Search the data and parse it to a json
      let info = data;
      let max = info.posts.$.count;

      // Get the random post
      let randomPost = Math.floor(Math.random() * max) + 0;
      
      // Validation of nothing found
      if (info.posts.$.count == '0') return msg.channel.send("No pude encontrar nada, marrano")
      
      // Parse of posts
      let post = info.posts.post;  
      
      // TODO: Resolve this bug (Maybe library bug?)
      // Handler of random bug
      if (post[randomPost].$ == undefined) return msg.channel.send("No pude encontrar nada con ese nombre, intenta con otra cosa, marrano")

      // Get the Image
      let imagen = post[randomPost].$.file_url;

      // Set the embed for the chat
      let reply = new message.BaseMessage(msg)
        reply.setTitle(`Resultados de ${parsed}`)
        reply.setColor(0x74DF00)
        reply.setImage(imagen)
        msg.channel.send(reply)
    });
    }
  })
  ]
}
