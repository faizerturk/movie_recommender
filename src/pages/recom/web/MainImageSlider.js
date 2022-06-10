import React, { useEffect,useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import RatingSlider from './RatingSlider'
import RatingSave from './RatingSaveButton'
import { PinDropSharp } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    // position:"relative",
    // left:'130px'
    height:'100%',
    borderRadius:20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    borderRadius: 20,
  },
  img: {
    height: 500,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    borderRadius: 20,
  },
  bottom: {
    borderRadius: 20,
  },
}));

export default function TextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [ratingValue,setRating]=useState([])
  const [movieArr,setMovarr]=useState([])
  const [resultsArray,setResults]=useState([])
  const [showLoading,setLoading]=useState(false)
  function setRatingarr(inptval){
    if(movieArr.includes(inptval.movieId)){
      setRating((oldval)=>[oldval.filter((val)=>inptval.movieId!=val.movieId)])
      setRating((oldval)=>[...oldval,inptval])
    }else{
      setRating((oldval)=>[...oldval,inptval])
      setMovarr((oldval)=>[...oldval,inptval.movieId])
    }
    
  }
  const [resetSlider,setSlider]=React.useState(false)

  const [tutorialSteps,setImages]=useState([{
    label: 'Loading',
    imgPath:
      'https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif',
  }])
  const [maxSteps,setMaxsteps]=useState(tutorialSteps.length)

  useEffect(()=>{
    const getMovies=async ()=>{
      try{
        const apiurl=`https://berkaycumbur.pythonanywhere.com/getrandom`
        const apiresp=await fetch(apiurl)
        const apidata=await apiresp.json()
        let tmpdata=[]
        apidata.ids.forEach((rw)=>{
          let tmpdict={}
          tmpdict.label=rw.title
          tmpdict.imgPath=rw.imageurl
          tmpdict.movieId=rw.movieId
          tmpdata.push(tmpdict)
          // setImages((oldval)=>[...oldval,tmpdict])
          setMaxsteps((old)=>old+1)
        })
        setMaxsteps((old)=>old-1)
        setImages(tmpdata)
      }catch(e){
        alert('Error in getting the movies. Please try to refresh the page and try again!!!')
      }
    }
    try{
      getMovies()
    }catch(e){
      alert('Error in getting the movies. Please try to refresh the page and try again!!!')
    }    
  },[])

  function toggleSlider(){
    setSlider(!resetSlider)
  }

  const handleNext = () => {
    console.log(ratingValue)
    if(!movieArr.includes(tutorialSteps[activeStep].movieId)){
      alert('Please select a rating!!')
      return
    }
    toggleSlider()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    toggleSlider()
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <img
        className={classes.img}
        src={tutorialSteps[activeStep].imgPath}
        alt={tutorialSteps[activeStep].label}
      />
      <MobileStepper
       className={classes.bottom}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
      />
      
    </div>
    <RatingSlider resetSlider={resetSlider} ratingFunc={setRatingarr} selmovieid={tutorialSteps[activeStep].movieId} selmoviename={tutorialSteps[activeStep].label} />
      {activeStep===tutorialSteps.length-1 && <RatingSave allMovieArry={movieArr} currntSelctdMovie={tutorialSteps[activeStep].movieId} saveRatingval={ratingValue} getResults={props.setResults} showRsultspage={props.setShowResults} />}
      
    </>
    
  );
}
