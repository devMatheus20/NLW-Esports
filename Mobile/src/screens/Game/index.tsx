import { useEffect, useState } from 'react'
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { GameParams } from '../../@types/navigation';

import { DuosCardProps } from '../../components/DuoCard';

import LogoImg from '../../assets/logo-nlw-esports.png'


import { THEME } from '../../theme';
import { styles } from './styles';

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { DuoCard } from '../../components/DuoCard';



export function Game() {

    const route = useRoute()
    const game = route.params as GameParams

    const [duos, setDuos] = useState<DuosCardProps[]>([])


    useEffect(() => {
        fetch(`http://192.168.0.109:3333/games/${game.id}/ads`)

            .then(response => response.json())

            .then(data => setDuos(data))

            .catch(error => console.log(error))
    }, [])


    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={LogoImg}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{uri: game.bannerUrl}}
                    style={styles.cover}
                    resizeMode="cover"
                    
                />


                <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />
                

                <FlatList 
                    data={duos}
                    style={styles.containerList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <DuoCard 
                            data={item} 
                            onConnect={() => {}}
                        
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[duos.length === 0 ? styles.emptyListContent : styles.contentList]}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicado ainda.
                        </Text>
                    )}
                />
            </SafeAreaView>
        </Background>
    );
}