import * as express from 'express';
import ExpressServer from '@/server';

export default new ExpressServer(express()).start();
