import {IonAlert, IonButton, IonInput, IonItem, IonPage} from "@ionic/react";
import {useHistory} from "react-router";
import {useEffect, useState} from "react";
import {useGlobalMutation} from "../../../containers/main";
import {Storage} from "@capacitor/storage";

const Login = () => {
  const history = useHistory();
  const mutationContext = useGlobalMutation();
  const [userInput, setUserInput] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    (async () => {
      const user = (await Storage.get({ key: 'user' })).value;

      mutationContext.setCurrentUser(user);

      if(user && user.length > 0){
        history.push('/items');
      }
    })();
  }, []);

  const handleButtonClick = () => {
    if(userInput.length === 0){
      setShowAlert(true);
    }

    mutationContext.setCurrentUser(userInput);
    history.push('/items');
  };


  return (
    <IonPage style={{ padding: 16, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <IonItem>
        <IonInput
          placeholder={'Enter username'}
          value={userInput}
          onIonChange={(e) => setUserInput(e.target.value)}
        />
        <IonButton color={'tertiary'} onClick={handleButtonClick}>
          Next
        </IonButton>
      </IonItem>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Alert'}
        subHeader={'Invalid input'}
        message={'Input must be of type number.'}
        buttons={['OK']}
      />
    </IonPage>
  )
};

export default Login;
