export default {
  title: 'Example project board'
, client: 'Client name'
, lists:
  [ { title: 'Backlog'
    , _id: '0'
    , cards:
      [ { position: 0
        , data:
          { text: 'Design homepage #design'
          , _id: '0'
          , list: '0'
          }
        }
      , { position: 1
        , data:
          { text: 'Design homepage #design'
          , _id: '0'
          , list: '0'
          }
        }
      , { position: 2
        , data:
          { text: 'Design projects page #design'
          , _id: '10'
          , list: '0'
          , position: 1
          }
        }
      ]
    }
  , { title: 'In Progress'
    , _id: '1'
    , cards:
      [ { position: 0
        , data:
          { text: 'Team permisson scoping'
          , _id: '1'
          , list: '1'
          }
        }
      , { position: 1
        , data:
          { text: 'Failed to load data (e.g. a creative that has been deleted) #bugs'
          , _id: '2'
          , list: '1'
          }
        }
      , { position: 2
        , data:
          { text: 'Creative library - slot type validation doesn\'t stop posting node then errors #bugs'
          , _id: '3'
          , list: '1'
          }
        }
      , { position: 3
        , data:
          { text: 'Build it #bugs'
          , _id: '4'
          , list: '1'
          }
        }
      ]
    }
  ]
}
