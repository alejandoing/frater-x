function _flattenDoc(doc) {
  return { id: doc.id, ...doc.data() }
}

const getDocumentById  = async (collection, id) => {
  const document = await collection.doc(id).get()
  return _flattenDoc(document)
}

module.exports.getDocumentById = getDocumentById