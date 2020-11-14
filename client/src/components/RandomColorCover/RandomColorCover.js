
export default function RandomColorCover () {
  const randomNumber = Math.floor(Math.random() * 8);
  
  const colorMap = [
    '#d3a0a0', 
    '#f0deae',
    '#ececbb',
    '#b0d8af',
    '#9ed6d8',
    '#bfbfe3',
    '#d4bfe3',
    '#ceadc6',
    '#b8b1a0'
  ]

  return(
    <div className="cover-art not-found" style={{backgroundColor:`${colorMap[randomNumber]}`}}>
      <p>
        no<br />cover<br />art<br />found
      </p>
    </div>
  );
};
