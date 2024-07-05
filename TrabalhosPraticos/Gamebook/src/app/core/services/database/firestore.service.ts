import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Equipa } from 'src/app/core/entities/equipa';
import { Jogo } from 'src/app/core/entities/jogo';
import { Utilizador } from '../../entities/utilizador';
import { FireAuthService } from '../auth/fire-auth.service';
import firebase from 'firebase/compat/app';
import { Md5 } from 'ts-md5';
import { Competicao } from '../../entities/competicao';
import { Jogador } from '../../entities/jogador';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private af: AngularFirestore) {
    /* this.buildFirestoreData(); */
  }



  getJogo(codigoJogo: string): any {
    //return this.af.doc('jogos/' + codigoJogo).snapshotChanges();
    return this.af.collectionGroup('jogos', ref => ref.where('$key', '==', codigoJogo)).valueChanges();
  }

  updateJogo(jogoID: any, jogo: Jogo) {
    jogo.$key = jogoID;
    this.af.collection('competicoes').doc(Md5.hashStr(jogo.competicao)).collection('jogos').doc(jogoID).set(jogo);
  }

  getJogadoresFromEquipa(equipa: string) {
    return this.af.collection('equipas').doc(Md5.hashStr(equipa)).valueChanges();
  }


  obterJogosFavoritos(): Jogo[] {
    // Obter equipas favoritas
    // Obter jogos das equipas favoritas
    throw new Error('Method not implemented.');
  }

  obterEquipa(nomeEquipa: string) {
    return this.af.collection('equipas').doc(Md5.hashStr(nomeEquipa)).valueChanges();
  }


  adicionarCompeticao(competicao: Competicao) {
    this.af.collection('competicoes').doc(Md5.hashStr(competicao.nome)).set(competicao).then(() => {
      console.log('Competição adicionada com sucesso');
    }
    ).catch(error => {
      console.error('Erro ao adicionar competição: ', error);
    });
  }

  adicionarEquipa(equipa: Equipa) {
    this.af.collection('equipas').doc(Md5.hashStr(equipa.nome)).set(equipa).then(() => {
      console.log('Equipa adicionada com sucesso');
    }).catch(error => {
      console.error('Erro ao adicionar equipa: ', error);
    });
  }

  adicionarJogo(jogo: Jogo) {
    return this.af.collection('competicoes').doc(Md5.hashStr(jogo.competicao)).collection('jogos').add(jogo);
  }

  adicionarFavoritos(equipas: Equipa[]) {
    let currentUser = firebase.auth().currentUser;

    equipas.forEach(equipa => {
      this.af.collection('utilizadores').doc(currentUser!.uid).collection('equipasFavoritas').doc(Md5.hashStr(equipa.nome)).set(equipa).then(() => {
        console.log('Equipas favoritas atualizadas com sucesso');
      }).catch(error => {
        console.error('Erro ao atualizar equipas favoritas: ', error);
      });
    });
  }

  obterJogosPorCompeticao(competicao: string) {
    return this.af.collection('competicoes').doc(Md5.hashStr(competicao)).collection('jogos').valueChanges();
  }

  obterTodosJogos() {
    return this.af.collectionGroup('jogos').snapshotChanges();
  }

  obterJogosEmCasaPorEquipa(equipa: string) {
    return this.af.collectionGroup('jogos', ref => ref.where('equipaCasa', '==', equipa)).valueChanges();
  }

  obterJogosForaPorEquipa(equipa: string) {
    return this.af.collectionGroup('jogos', ref => ref.where('equipaVisitante', '==', equipa)).valueChanges();
  }


  buildFirestoreData() {
    let benfica: Equipa = {
      nome: 'Benfica',
      imagem: 'https://www.zerozero.pt/img/logos/equipas/4_imgbank_1683238034.png',
      treinador: 'Jorge Jesus',
      presidente: 'Rui Costa',
      estadio: {
        nome: 'Estádio da Luz',
        latitude: 38.752,
        longitude: -9.184
      },
      jogadores: [
        { nome: 'Samuel Soares', posicao: 'Guarda-Redes', imagem: 'https://www.zerozero.pt/img/jogadores/32/490932_20230913144504_samuel_soares_1694612704.jpg' },
        { nome: 'António Silva', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/96/490496_20230913145023_antonio_silva_1694613023.jpg' },
        { nome: 'Tiago Gouveia', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/79/155479_20230913144045_tiago_gouveia_1694612445.jpg' },
        { nome: 'David Neres', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/29/458729_20230913144501_david_neres_1694612701.jpg' },
        { nome: 'Nicolás Otamendi', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/88/67588_20230913144012_nicolas_otamendi_1694612412.jpg' },
        { nome: 'Henrique Araújo', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/31/238031_20230809204144_henrique_araujo.png' },
        { nome: 'João Neves', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/29/587629_20230913145054_joao_neves_1694613054.jpg' },
        { nome: 'Florentino Luís', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/29/166229_20230913144958_florentino_luis_1694612998.jpg' },
        { nome: 'Alexander Bah', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/06/523006_20230913145023_alexander_bah_1694613023.jpg' },
        { nome: 'Diogo Spencer', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/22/587622_20240123144510_diogo_spencer.jpg' },
        { nome: 'Marcos Leonardo', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/17/570117_20240124194847_marcos_leonardo.jpg' },
        { nome: 'João Mário', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/60/56560_20230913144958_joao_mario_1694612998.jpg' },
        { nome: 'Alvaro Carreras', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/new/53/05/825305_alvaro_carreras_20240523111548.jpg' },
        { nome: 'Tomás Araujo', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/53/520353_20230913144137_tomas_araujo_1694612497.jpg' },
      ],
    };

    let sporting: Equipa = {
      nome: 'Sporting',
      imagem: 'https://www.zerozero.pt/img/logos/equipas/16_imgbank_1712761920.png',
      treinador: 'Rúben Amorim',
      presidente: 'Frederico Varandas',
      estadio: {
        nome: 'Estádio José Alvalade',
        latitude: 38.761,
        longitude: -9.161
      },
      jogadores: [
        { nome: 'Franco Israel', posicao: 'Guarda-Redes', imagem: 'https://www.zerozero.pt/img/jogadores/new/60/67/556067_franco_israel_20240224190752.png' },
        { nome: 'Eduardo Quaresma', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/17/160517_20230914105340_eduardo_quaresma_1694685220.jpg' },
        { nome: 'Gonçalo Inácio', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/59/384159_20230914105423_goncalo_inacio_1694685263.jpg' },
        { nome: 'Viktor Gyökeres', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/56/473956_20230914105457_viktor_gyokeres_1694685297.jpg' },
        { nome: 'Francisco Trincão', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/56/500256_20230914105457_francisco_trincao_1694685297.jpg' },
        { nome: 'Daniel Bragança', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/50/84850_20230914105323_daniel_braganca_1694685203.jpg' },
        { nome: 'Hidemasa Morita', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/15/624515_20230914105532_hidemasa_morita_1694685332.jpg' },
        { nome: 'Morten Hjulmand', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/57/529157_20230914105458_morten_hjulmand_1694685298.jpg' },
        { nome: 'Pedro Gonçalves', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/88/338388_20230914105340_pedro_goncalves_1694685220.jpg' },
        { nome: 'Nuno Santos', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/73/160873_20230914105340_nuno_santos_1694685220.jpg' },
        { nome: 'Geny Catamo', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/63/639363_20230914105532_geny_catamo_1694685332.jpg' },
        { nome: 'Marcus Edwards', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/96/429596_20230914105423_marcus_edwards_1694685263.jpg' },
        { nome: 'Dário Essugo', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/new/89/90/508990_dario_essugo_20240213171629.png' },
        { nome: 'Francisco Silva', posicao: 'Guarda-Redes', imagem: 'https://www.zerozero.pt/img/jogadores/new/45/98/664598_francisco_silva_20240416181629.png' },
      ],
    };

    let porto: Equipa = {
      nome: 'Porto',
      imagem: 'https://www.zerozero.pt/img/logos/equipas/9_imgbank_1682582465.png',
      treinador: 'Sérgio Conceição',
      presidente: 'Pinto da Costa',
      estadio: {
        nome: 'Estádio do Dragão',
        latitude: 41.161,
        longitude: -8.583
      },
      jogadores: [
        { nome: 'Diogo Costa', posicao: 'Guarda-Redes', imagem: 'https://www.zerozero.pt/img/jogadores/06/284406_20230804165319_diogo_costa.png' },
        { nome: 'Wendell', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/64/274164_20230804165546_wendell.png' },
        { nome: 'Francisco Conceição', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/54/318154_20230920160418_francisco_conceicao.png' },
        { nome: 'Pepê', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/58/474258_20230804165758_pepe.png' },
        { nome: 'Martim Fernandes', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/49/743949_20230816172624_martim_fernandes.jpg' },
        { nome: 'Wenderson Galeno', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/90/505790_20230804170012_wenderson_galeno.png' },
        { nome: 'Alan Varela', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/26/824626_20230818160808_alan_varela.png' },
        { nome: 'João Mário', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/83/421283_20230804165403_joao_mario.png' },
        { nome: 'Iván Jaime', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/53/657353_20230901164821_ivan_jaime.png' },
        { nome: 'Evanilson', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/07/513007_20230804165938_evanilson.png' },
        { nome: 'Cláudio Ramos', posicao: 'Guarda-Redes', imagem: 'https://www.zerozero.pt/img/jogadores/26/97926_20230804165224_claudio_ramos.png' },
        { nome: 'Fábio Cardoso', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/43/74943_20230804165418_fabio_cardoso.png' },
        { nome: 'André Franco', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/55/88255_20230804165622_andre_franco.png' },
        { nome: 'Nico González', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/88/662788_20230804165721_nico_gonzalez.png' },
      ],
    };

    let sporting_braga: Equipa = {
      nome: 'Sporting Braga',
      imagem: 'https://www.zerozero.pt/img/logos/equipas/15_imgbank_1682583585.png',
      treinador: 'Carlos Carvalhal',
      presidente: 'António Salvador',
      estadio: {
        nome: 'Estádio Municipal de Braga',
        latitude: 41.550,
        longitude: -8.431
      },
      jogadores: [
        { nome: 'Matheus Magalhães', posicao: 'Guarda-Redes', imagem: 'https://www.zerozero.pt/img/jogadores/75/147075_20230726125933_matheus_magalhaes_1690372773.jpg' },
        { nome: 'Serdar Saatci', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/57/839057_20230727101433_serdar_saatci_1690449273.jpg' },
        { nome: 'Ricardo Horta', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/52/74952_20230726130717_ricardo_horta_1690373237.jpg' },
        { nome: 'André Horta', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/60/84960_20240120150323_andre_horta.png' },
        { nome: 'Rodrigo Zalazar', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/07/689707_20230727101406_rodrigo_zalazar_1690449246.jpg' },
        { nome: 'Bruma', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/12/74312_20230726130658_bruma_1690373218.jpg' },
        { nome: 'Paulo Oliveira', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/30/133030_20230726130744_paulo_oliveira_1690373264.jpg' },
        { nome: 'Simon Banza', posicao: 'Avançado', imagem: 'https://www.zerozero.pt/img/jogadores/56/473356_20230727100932_simon_banza_1690448972.jpg' },
        { nome: 'João Moutinho', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/new/76/08/7608_joao_moutinho_20240303001718.jpg' },
        { nome: 'Víctor Gómez', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/34/559734_20230727101302_victor_gomez__1690449182.jpg' },
        { nome: 'Adrián Marín', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/31/420531_20230726130848_adrian_marin_1690373328.jpg' },
        { nome: 'Francisco Chissumba', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/50/1034050__20230823164639_francisco_chissumba.png' },
        { nome: 'Vitor Carvalho', posicao: 'Médio', imagem: 'https://www.zerozero.pt/img/jogadores/70/544570_20230727101220_vitor_carvalho_1690449140.jpg' },
        { nome: 'Robson Bambu', posicao: 'Defesa', imagem: 'https://www.zerozero.pt/img/jogadores/new/53/13/495313_robson_bambu_20240207174559.png' },
      ],
    };

    this.adicionarEquipa(benfica);
    this.adicionarEquipa(sporting);
    this.adicionarEquipa(porto);
    this.adicionarEquipa(sporting_braga);


    /* Jogos Liga NOS */

    let jogo1: Jogo = {
      $key: '',
      competicao: 'Liga NOS',
      estadio: {
        nome: 'Estádio da Luz',
        latitude: 38.752,
        longitude: -9.184
      },
      equipaCasa: 'Benfica',
      equipaVisitante: 'Sporting',
      data: new Date('2021-10-03T19:00:00'),
      resultado: {
        golosCasa: 1,
        golosVisitante: 2
      },
    };


    let jogo2: Jogo = {
      $key: '',
      competicao: 'Liga NOS',
      estadio: {
        nome: 'Estádio José Alvalade',
        latitude: 38.761,
        longitude: -9.161
      },
      equipaCasa: 'Sporting',
      equipaVisitante: 'Porto',
      data: new Date('2024-06-29T19:00:00'),
      resultado: {
        golosCasa: 2,
        golosVisitante: 1
      }
    };

    let jogo3: Jogo = {
      $key: '',
      competicao: 'Liga NOS',
      estadio: {
        nome: 'Estádio do Dragão',
        latitude: 41.161,
        longitude: -8.583
      },
      equipaCasa: 'Porto',
      equipaVisitante: 'Sporting Braga',
      data: new Date('2024-07-03T19:00:00'),
      resultado: null
    };


    let jogo4: Jogo = {
      $key: '',
      competicao: 'Liga NOS',
      estadio: {
        nome: 'Estádio da Luz',
        latitude: 38.752,
        longitude: -9.184
      },
      equipaCasa: 'Benfica',
      equipaVisitante: 'Porto',
      data: new Date('2024-07-03T19:00:00'),
      resultado: null
    }

    /* Jogos Taça de Portugal */

    let jogo5: Jogo = {
      $key: '',
      competicao: 'Taça Portugal',
      estadio: {
        nome: 'Estádio da Luz',
        latitude: 38.752,
        longitude: -9.184
      },
      equipaCasa: 'Benfica',
      equipaVisitante: 'Sporting Braga',
      data: new Date('2022-02-15T19:00:00'),
      resultado: null
    };

    let jogo6: Jogo = {
      $key: '',
      competicao: 'Taça Portugal',
      estadio: {
        nome: 'Estádio José Alvalade',
        latitude: 38.761,
        longitude: -9.161
      },
      equipaCasa: 'Sporting',
      equipaVisitante: 'Porto',
      data: new Date('2022-02-16T19:00:00'),
      resultado: null
    };

    let jogo7: Jogo = {
      $key: '',
      competicao: 'Taça Portugal',
      estadio: {
        nome: 'Estádio do Dragão',
        latitude: 41.161,
        longitude: -8.583
      },
      equipaCasa: 'Porto',
      equipaVisitante: 'Benfica',
      data: new Date('2022-02-22T19:00:00'),
      resultado: null
    };

    let jogo8: Jogo = {
      $key: '',
      competicao: 'Taça Portugal',
      estadio: {
        nome: 'Estádio Municipal de Braga',
        latitude: 41.550,
        longitude: -8.431
      },
      equipaCasa: 'Sporting Braga',
      equipaVisitante: 'Sporting',
      data: new Date('2022-02-23T19:00:00'),
      resultado: null
    };


    this.adicionarJogo(jogo1).then((docRef) => {
      console.log('Jogo adicionado com sucesso: ', docRef.id);
      this.updateJogo(docRef.id, jogo1);
    });
    this.adicionarJogo(jogo2).then((docRef) => {
      this.updateJogo(docRef.id, jogo2);
    });
    this.adicionarJogo(jogo3).then((docRef) => {
      this.updateJogo(docRef.id, jogo3);
    });
    this.adicionarJogo(jogo4).then((docRef) => {
      this.updateJogo(docRef.id, jogo4);
    });
    this.adicionarJogo(jogo5).then((docRef) => {
      this.updateJogo(docRef.id, jogo5);
    });
    this.adicionarJogo(jogo6).then((docRef) => {
      this.updateJogo(docRef.id, jogo6);
    });
    this.adicionarJogo(jogo7).then((docRef) => {
      this.updateJogo(docRef.id, jogo7);
    });
    this.adicionarJogo(jogo8).then((docRef) => {
      this.updateJogo(docRef.id, jogo8);
    });


    let favoritos = [benfica, sporting_braga];

    this.adicionarFavoritos(favoritos);
  }

}


