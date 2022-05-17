import { useEffect, useState } from "react"
import { db } from "../firebase/config"

const useFirebase = (collection, condition) => {
    const [document, setDocuments] = useState([])
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt')

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([])
                return
            }
            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue
            )
        }

        const unsubscribe = collectionRef.onSnapshot(snapshot => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setDocuments(documents);
        })
        return unsubscribe
    }, [collection, condition])
    return document;
}

export default useFirebase