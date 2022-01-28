import {IonApp, IonRouterOutlet } from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import React from "react";
import {Route, Switch} from "react-router";
import ItemList from "./scenes/items/components/ItemList";


const AppRoutes = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path='/'>
              <ItemList />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default AppRoutes;
