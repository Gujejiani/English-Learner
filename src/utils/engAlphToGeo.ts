






export const engAlphabetToGeo  = (word: string) =>{
if(!word) return;


let georgian: string = ''
let letters= mappedLetters()
let curlyIndex = word.indexOf(')')

let lettersArray: Array<string> =word.split('')
if(curlyIndex){
    lettersArray.splice(0, curlyIndex+1)
    georgian +=  word.slice(0, curlyIndex+1)
}


lettersArray.forEach((letter: string)=>{
    const geoLetter = letters.get(letter)
    if(geoLetter){
        georgian +=  geoLetter 
    }else{
        georgian +=  letter 
    }
})

return georgian

}


const mappedLetters = ()=>  {
    const letters =new Map<string, string>()  
    letters.set('a', 'ა')
    letters.set('b', 'ბ')
    letters.set('c', 'ც')
    letters.set('C', 'ჩ')
    letters.set('d', 'დ')
    letters.set('e', 'ე')
    letters.set('f', 'ფ')
    letters.set('g', 'გ')
    letters.set('h', 'ჰ')
    letters.set('i', 'ი')
    letters.set('j', 'ჯ')
    letters.set('k', 'კ')
    letters.set('l', 'ლ')
    letters.set('m', 'მ')
    letters.set('n', 'ნ')
    letters.set('o', 'ო')
    letters.set('p', 'პ')
    letters.set('q', 'ქ')
    letters.set('r', 'რ')
    letters.set('R', 'ღ')
    letters.set('s', 'ს')
    letters.set('S', 'შ')
    letters.set('t', 'ტ')
    letters.set('T', 'თ')
    letters.set('u', 'უ')
    letters.set('v', 'ვ')
    letters.set('w', 'წ')
    letters.set('x', 'ხ')
    letters.set('y', 'ყ')
    letters.set('z', 'ზ')
    letters.set('Z', 'ძ')
    return letters
}