import React,{useState} from 'react'
import MainImgSlider from '../web/MainImageSlider'
import ResultsGrid from '../web/ResultsGrid'
import Typography from '@material-ui/core/Typography';
import MobMainImgSlider from '../mobile/MobMainImageSlider'
import ResultsStepper from '../mobile/ResultsStepper'

function MainBody(){

    const [showResults,setResults]=useState(false)
    const [resultsArray,setResultsarr]=useState([])

    const [mobshowResults,setmobResults]=useState(false)
    const [mobresultsArray,setmobResultsarr]=useState([])
   

    return <>

    <div className='mobmainContainer' style={{"borderRadius":"%20", "margin":"auto"}}>
    {!mobshowResults &&  <Typography variant="h4" component="h4" className='mobmainlabel' >Please Rate these movies</Typography>}
    {mobshowResults && <Typography variant="h4" component="h4" className='mobmainlabel' >Your Recommendations</Typography>}
    {mobshowResults && <div className='mobresultscontainer'>
            <ResultsStepper style={{"borderRadius":"%20"}} resultsData={mobresultsArray} />
        </div>}
    {!mobshowResults && <div className='mobslidercontainer'>
        <MobMainImgSlider style={{"borderRadius":"%20"}} setResults={setmobResultsarr} setShowResults={setmobResults} />
        </div>}
    </div>

    </>
}

export default MainBody