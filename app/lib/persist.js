import MakeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName){
    const finalStore = MakeFinalStore(alt);

    try{
        alt.bootstrap(storage.get(storeName));
    }
    catch(ex){
        console.error('Failed to bootstrap data', e);
    }

    finalStore.listen(() => {
        if(!storage.get('debug')){
            storage.set(storeName, alt.takeSnapshot());
        }
    });
}