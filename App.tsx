import { ScrollView,View,TextInput, Text,StyleSheet,TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import * as Yup from 'yup';
import { Formik } from "formik";
import BouncyCheckBox from "react-native-bouncy-checkbox";
function App(){
  const passwordSchema = Yup.object().shape({
    passwordLength:Yup.number()
    .min(4,"Min length of 4 is required")
    .max(100,'Max length of 100 characters is required')
    .required("Length is required")
  })
 
  const [password,setPassword] = useState('');
  const [isPasswordGenerated,setIsPasswordGenerated] = useState(false);

  const [number,setNumber] = useState(true);
  const [symbol,setSymbol] = useState(true);
  const [lowercase,setLowerCase] = useState(true);
  const [upperCase,setUpperCase] = useState(true);
  
  const passwordGenerator = (passwordLength:number)=>{
    let passwordString = "";
    const upperCaseLetters  = "ABCDEFGHIJKLMNOPQRSTUVWXZY";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const num = "12345789";
    const symbols = "!@#$%^&*";


    if(number){
       passwordString += num;
    }
    
    if(lowercase){
      passwordString += lowerCaseLetters;
   }
   
   if(upperCase){
    passwordString += upperCaseLetters;
 }
 
 if(symbol){
  passwordString += symbols;
}

let password1 = createPassword(passwordString,passwordLength);
setPassword(password1);
setIsPasswordGenerated(true);
  }

  const createPassword = (characters:string,passwordLength:number)=>{
    let result = "";
    for(let i=0;i<passwordLength;i++){
      const  characterIndex= Math.floor(Math.random()*characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  }


  const resetPassword = ()=>{
     setPassword("");
     setIsPasswordGenerated(false);
  }


  return(
    
     <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
        <Formik
       initialValues={{ passwordLength:''  }}
       validationSchema={passwordSchema}
       onSubmit={values=>{
        passwordGenerator(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleReset,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <>
         <View style = {styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {
              touched.passwordLength && errors.passwordLength &&(
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              )
            }
          </View>
          <TextInput
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          placeholder="Ex 8"
          keyboardType="numeric"
          >    
          </TextInput>
         </View>
         <View style={styles.inputWrapper}>
          <Text  style={styles.heading}>Include Lowercase</Text>
          <BouncyCheckBox
          isChecked={lowercase}
          onPress={()=>{
            setLowerCase(!lowercase);
          }}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text  style={styles.heading}>Include Uppercase</Text>
          <BouncyCheckBox
          isChecked={upperCase}
          onPress={()=>{
           setUpperCase(!upperCase);
          }}
          fillColor="#FED85D"
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text  style={styles.heading}>Include Numbers</Text>
          <BouncyCheckBox
          isChecked={number}
          onPress={()=>{
           setNumber(!number);
          }}
          fillColor="#C9A0DC"
          />
         </View>
         <View style={styles.inputWrapper}>
          <Text  style={styles.heading}>Include Symbols</Text>
          <BouncyCheckBox
          isChecked={symbol}
          onPress={()=>{
           setSymbol(!symbol);
          }}
          fillColor="#FC80A5"
          />
         </View>
        <View style={styles.formActions}>
        <TouchableOpacity
        disabled={!isValid}
        style={styles.primaryBtn}
        onPress={()=>{
          handleSubmit()
        }}
        >
         <Text style={styles.primaryBtnTxt}>Generate Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.secondaryBtn}
        onPress={()=>{
          handleReset()
          resetPassword()
        }}
        >
        <Text style={styles.secondaryBtnTxt}>Reset</Text>
        </TouchableOpacity>
        </View>
         </>
       )}
     </Formik>
     </View>
     {isPasswordGenerated?(
       <View style={[styles.card, styles.cardElevated]}>
       <Text style={styles.subTitle}>Result:</Text>
       <Text style={styles.description}>Long Press to copy</Text>
       <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
     </View>
     ):null}
      </SafeAreaView>
     </ScrollView>
   
  )
}



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});

export default App;