import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2d3142',
  secondary: '#4f5d75',
  accent: '#5e9ff2',
  background: '#bfc0c0',
  white: '#ffffff',
  lightGray: '#f6f7f8',
  text: '#2d3142',
};

export const typography = {
  h1: {
    fontFamily: 'Archivo-Bold',
    fontSize: 24,
    color: colors.text,
  },
  h2: {
    fontFamily: 'Archivo-Bold',
    fontSize: 20,
    color: colors.text,
  },
  body: {
    fontFamily: 'Archivo-Regular',
    fontSize: 16,
    color: colors.text,
  },
  light: {
    fontFamily: 'Archivo-Light',
    fontSize: 14,
    color: colors.text,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.background,
    padding: 15,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});