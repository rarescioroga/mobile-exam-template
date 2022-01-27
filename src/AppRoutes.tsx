import {IonApp, IonRouterOutlet } from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import React, {useEffect} from "react";
import {useGlobalMutation, useGlobalState} from "./containers/main";


const AppRoutes = () => {
  const stateContext: any = useGlobalState();
  const mutationContext: any = useGlobalMutation();


  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default AppRoutes;
