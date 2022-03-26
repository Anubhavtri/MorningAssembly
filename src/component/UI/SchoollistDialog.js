import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import { Button } from '../../component/UI';
import fonts from '../../utility/fonts';
import Modal from 'react-native-modal';
const SchoollistDialog = ({ visible, visibleFun, myCallback, title, sub_title, data }) => {
    const [text, setText] = useState('');
    const [Index, setindex] = useState('');
    const [selected, setselected] = useState('');
    const [selected_id, setselected_id] = useState('');




    const renderItem_requested_skill = (item, index) => {

        { console.log('renderItem_requested_skill>>', index) }

        return (
            <TouchableOpacity
                onPress={() => {
                    setindex(index);
                    setselected(item.school_name);
                    setselected_id(item._id);
                }
                }>
                <View
                    style={{
                        margin: s(5),
                        marginBottom: s(10),

                    }}>
                   
                    <View style={{ flexDirection: 'row' }}>
                        {Index == index ?
                            <Image
                                style={{
                                    marginRight: s(10),
                                    alignSelf: 'center', alignContent: 'center'
                                }}
                                source={require('../../images/active_radio.png')} />
                            :
                            <Image
                                style={{
                                    marginRight: s(10),
                                    alignSelf: 'center', alignContent: 'center'
                                }}
                                source={require('../../images/inactive_radio.png')} />
                        }
                        <Text>{item.school_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    };


    return (

        <Modal
            style={{ margin: 0 }}
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                visibleFun();
                // myCallback('Gaurav')
            }}>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#00000080',
                    width: '100%'
                }}>

                <View
                    style={{ alignContent: 'center', alignItems: 'center', margin: s(20) }}>
                    <View style={styles.toolbar}>
                        <Text style={styles.Title}>{title || 'Confirm'}</Text>
                        <Text style={styles.Sub_Title}>
                            {sub_title ||
                                `Are you sure you want ${'\n'} to send this skill to be assigned to your account?`}
                        </Text>
                        <View
                            style={{
                                alignItems: 'flex-start',

                            }}>
                            {/* <FlatList

                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                data={data}
                                renderItem={({ item, index }) => {
                                    return renderItem_requested_skill(item, index);

                                }}
                            /> */}

                            {data.map((data, index) => renderItem_requested_skill(data, index))}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',

                            }}>
                            <View style={{}}></View>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('only check');
                                    visibleFun();
                                }}>
                                <View style={styles.button}>
                                    <Text
                                        style={{
                                            color: colors.PRIMARY_COLOR,
                                            fontFamily: fonts('poppinsSemibold'),
                                        }}>
                                        {'Cancel'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    console.log('only check');
                                    myCallback(selected,selected_id);
                                }}>
                                <View style={styles.button_confirm}>
                                    <Text
                                        style={{
                                            color: colors.WHITE_COLOR,
                                            fontFamily: fonts('poppinsSemibold'),
                                        }}>
                                        {'Confirm'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000080',


    },
    toolbar: {
        backgroundColor: colors.WHITE_COLOR,
        padding: s(10),
        marginTop: s(40),
        marginLeft: s(50),
        marginRight: s(50),
        borderRadius: s(10),
    },

    sectionTitle: {
        fontSize: s(12),
        color: colors.PRIMARY_TEXT_COLOR,
        //fontFamily: fonts('poppinsSemibold'),
        alignContent: 'center',
        margin: s(20),
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    Title: {
        fontSize: s(15),
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsSemibold'),
        textAlign: 'center',
        alignSelf: 'center',

        marginTop: s(20),
    },
    Sub_Title: {
        fontSize: s(11),
        color: colors.SECONDARY_TEXT_COLOR,

        marginLeft: s(20),
        marginRight: s(20),
        padding: s(5),
        textAlign: 'center',
        fontFamily: fonts('poppinsMedium'),
    },
    Small_Title: {
        fontSize: s(8),
        color: colors.PRIMARY_COLOR,
        //fontFamily: fonts('poppinsSemibold'),
        margin: s(5),
    },
    button: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(40),
        width: s(120),
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: s(5),
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: s(20),
        fontSize: s(12),

        alignContent: 'center',
        alignSelf: 'center',
    },
    button_confirm: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(40),
        width: s(120),
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: s(5),
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        color: colors.WHITE_COLOR,
        alignContent: 'center',
        alignSelf: 'center',
    },
});

export default SchoollistDialog;
