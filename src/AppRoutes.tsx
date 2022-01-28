import {IonApp, IonRouterOutlet } from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import React, {useEffect} from "react";
import {useGlobalMutation, useGlobalState} from "./containers/main";
import {Route, Switch, useHistory} from "react-router";
import ItemList from "./scenes/items/components/ItemList";
import Login from "./scenes/items/components/Login";

const AppRoutes = () => {
  const stateContext: any = useGlobalState();
  const mutationContext: any = useGlobalMutation();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path='/items'>
              <ItemList />
            </Route>
            <Route exact path='/'>
              <Login />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default AppRoutes;
