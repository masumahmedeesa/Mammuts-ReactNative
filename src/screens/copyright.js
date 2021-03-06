import React from 'react';
import {Text, View, ScrollView} from 'react-native';

const CopyrightScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <ScrollView>
        <View style={{marginTop: 10, padding: 30}}>
          <Text style={{color: '#fff', fontSize: 20}}> Nota di copyright </Text>
          <View style={{padding: 3}}>
            <Text style={{color: 'silver'}}>
              Tutti i file e le informazioni contenuti nel sito Web,
              all'indirizzo http://www.mammuts.it sono copyright di Davide
              Cavallari e non possono essere duplicati, copiati, modificati o
              adattati in alcun modo senza il nostro permesso scritto. Questo
              sito Web può contenere i nostri marchi di servizio o marchi
              commerciali, nonché quelli delle nostre affiliate o di altre
              società, sotto forma di parole, grafici e loghi. L'utilizzo del
              nostro sito Web, non da nessun diritto o licenza per l'utilizzo
              dei nostri marchi di servizio, senza la previa autorizzazione
              scritta di Davide Cavallari. Il nostro contenuto, come si trova
              all'interno del nostro sito Web, è protetto da copyright locali e
              stranieri. La copia, la ridistribuzione, l'uso o la pubblicazione
              da parte dell'utente di tali Contenuti è severamente vietata. Il
              tuo utilizzo del nostro sito web e dei nostri servizi non ti
              garantisce alcun diritto di proprietà sui nostri contenuti.
            </Text>
          </View>
          <View style={{marginTop: 5}}>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              {' '}
              Applicazione del diritto d'autore{' '}
            </Text>
          </View>
          <View style={{padding: 3}}>
            <Text style={{color: 'silver'}}>
              Davide Cavallari prende molto sul serio la protezione dei suoi
              diritti d'autore. Se Davide Cavallari scoprisse che hai utilizzato
              i suoi materiali protetti da copyright in violazione della licenza
              di cui sopra, Davide Cavallari può intentare un'azione legale
              contro di te chiedendo un risarcimento dei danni e un'ingiunzione
              per impedirti di utilizzare tali materiali. Potresti anche essere
              obbligato a pagare le spese legali. Se vieni a conoscenza di
              qualsiasi utilizzo del materiale protetto da copyright di Davide
              Cavallari che viola o potrebbe contravvenire alla licenza di cui
              sopra, ti preghiamo di segnalarcelo immediatamente. Copyright ©
              Davide Cavallari 2020 Tutti i diritti riservati{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CopyrightScreen;
