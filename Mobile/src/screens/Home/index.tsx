import { useEffect, useState } from 'react'
import { Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";


export function Home() {

    const [games, setGames] = useState<GameCardProps[]>([])

    const navigation = useNavigation()

    useEffect(() => {
        fetch('http://192.168.0.109:3333/games')

            .then(response => response.json())

            .then(data => setGames(data))

            .catch(error => console.log(error))
    }, [])

    function handleOpenGame({id, title, bannerUrl} : GameCardProps) {
        navigation.navigate('game', {id, title, bannerUrl})
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image source={logoImg} style={styles.logo} />

                <Heading
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />

                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentList}
                    horizontal
                />
            </SafeAreaView>
        </Background>
    );
}