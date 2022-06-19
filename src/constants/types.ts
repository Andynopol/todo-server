import mongoose, { Document } from "mongoose";

export interface UserDataDoc extends Document {
    firstName: string,
    lastName: string,
    uuid: mongoose.Types.ObjectId,
    username?: string,
    email: string,
    password: string,
}

export interface UserData {
    firstName: string,
    lastName: string,
    uuid: mongoose.Types.ObjectId,
    username?: string,
    email: string,
    password: string,
}

export interface RegisterRequestPayload {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}