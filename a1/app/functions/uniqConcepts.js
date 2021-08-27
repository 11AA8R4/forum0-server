






export default function uniqConcepts(concepts,oldConcepts){
  console.log('oldConcepts',oldConcepts)
  console.log('concepts 0',concepts)
  if(oldConcepts) concepts = concepts.flatMap(concept=>{
    return oldConcepts.find(found=>found===concept)?[]:concept
  })
  console.log('concepts 1',concepts)
  let uniq = [...new Set(concepts)]
  console.log('uniq',uniq)
  return uniq
}