 export const DefaultValues = {
     BaseSuccessfullMessage: 'Successfully',
     BaseUnsucessfullMessage:'Unsuccessful',
     SuccessullyPost:' Added',
     SuccessulUpdate:' Updated',
     SuccessfulDelete:' Delete',
     DefaultFailureCode : 400,
     RequiredFields:'Please Fill In All Required Fields.'
      
}

export class SharedMethods {

    public static GetStatus(value,message:string): string
    {
        return value == DefaultValues.DefaultFailureCode ? 
        DefaultValues.BaseUnsucessfullMessage :
        DefaultValues.BaseSuccessfullMessage+message;
    }

    public static GetDate() : Date
    {
         return new Date();
    }
}