let pokemonRepository = (function() {
  let n = [];
  return (
    $(document).ready(function() {
      $('#search-input').on('keyup', function() {
        var t = $(this)
          .val()
          .toLowerCase();
        $('.list-group *').filter(function() {
          $(this).toggle(
            -1 <
              $(this)
                .text()
                .toLowerCase()
                .indexOf(t)
          );
        });
      });
    }),
    {
      getAll: function() {
        return n;
      },
      addListItem: function(e) {
        let t = document.querySelector('.pokemon-list'),
          n = document.createElement('li');
        n.classList.add('group-list-item');
        let o = document.createElement('button');
        (o.innerText = e.name),
          o.classList.add('button-class', 'btn', 'btn-primary'),
          o.setAttribute('data-target', '#pokemonModal'),
          o.setAttribute('data-toggle', 'modal'),
          n.appendChild(o),
          t.appendChild(n),
          o.addEventListener('click', function() {
            var t;
            (t = e),
              pokemonRepository.loadDetails(t).then(function() {
                !(function(t) {
                  let e = $('.modal-body'),
                    n = $('.modal-title');
                  n.empty(),
                    e.empty(),
                    $('#pokemonModal').addClass('show'),
                    $('#pokemonModal').show();
                  let o = $('<h1>' + t.name + '</h1>'),
                    i = $('<img class="modal-img" style="width:30%">');
                  i.attr('src', t.imageUrlFront);
                  let a = $('<img class="modal-img" style="width:30%">');
                  a.attr('src', t.imageUrlBack);
                  var l = $('<p>Height : ' + t.height + '</p>'),
                    s = $('<p>Weight : ' + t.weight + '</p>'),
                    r = $('<p>Types : ' + t.types.join(', ') + '</p>'),
                    t = $('<p>Abilities : ' + t.abilities.join(', ') + '</p>');
                  n.append(o),
                    e.append(i),
                    e.append(a),
                    e.append(l),
                    e.append(s),
                    e.append(r),
                    e.append(t);
                })(t);
              });
          });
      },
      loadList: function() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
          .then(function(t) {
            return t.json();
          })
          .then(function(t) {
            t.results.forEach(function(t) {
              var e = { name: t.name, detailsUrl: t.url };
              'object' == typeof (t = e) && 'name' in t && 'detailsUrl' in t
                ? n.push(t)
                : console.log('pokemon is not correct'),
                console.log(e);
            });
          })
          .catch(function(t) {
            console.error(t);
          });
      },
      loadDetails: function(n) {
        var t = n.detailsUrl;
        return fetch(t)
          .then(function(t) {
            return t.json();
          })
          .then(function(e) {
            (n.imageUrlFront = e.sprites.front_default),
              (n.imageUrlBack = e.sprites.back_default),
              (n.height = e.height),
              (n.weight = e.weight),
              (n.types = e.types),
              (n.types = []);
            for (let t = 0; t < e.types.length; t++)
              n.types.push(e.types[t].type.name);
            n.abilities = [];
            for (let t = 0; t < e.abilities.length; t++)
              n.abilities.push(e.abilities[t].ability.name);
          })
          .catch(function(t) {
            console.error(t);
          });
      }
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
