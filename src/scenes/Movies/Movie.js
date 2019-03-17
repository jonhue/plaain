import React, { Component } from 'react'
// import './Movie.scss'

// import Caption from '../../models/Caption'
// import { default as MovieModel } from '../../models/Movie'
// import Source from '../../models/Source'
// import Video from '../../models/Video'

import PlyrPlayer from '../../components/PlyrPlayer'

class Movie extends Component {
  render({ match }) {
    // const video = new Video(
    //   'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
    //   [
    //     new Source('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4', 'video/mp4', 576),
    //     new Source('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4', 'video/mp4', 720),
    //     new Source('https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4', 'video/mp4', 1080)
    //   ],
    //   [
    //     new Caption('English', 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt', 'en'),
    //     new Caption('Français', 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt', 'fr')
    //   ]
    // )
    // // const movie = new MovieModel(299537, video).fetch()
    // const movie = new MovieModel(match.params.id, video).fetch()
    // console.log(movie)

    return (
      <div className="Movie">
      </div>
    )
  }
}

export default Movie
