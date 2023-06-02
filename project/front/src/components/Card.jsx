import { useState } from 'react'
import { Link } from 'react-router-dom';

import Button from './Button';
import Tags from "./Tags";

export default function Card({ job, user }) {
  return (
    <div className={`card ${job.status === 'PAUSED' && 'disabled cursor-default'}`}>
      <header className='flex flex-col-reverse sm:flex-row justify-between sm:items-center gap-4 mb-4'>
        <div>
          <Link to={job.status !== 'PAUSED' && `/jobs/${job.id}`}>
            <h1 className={`cursor-default border-b-2 border-b-zinc-800 mb-2 ${job.status !== 'PAUSED' && 'clickable-title'}`}>{job.title}</h1>
          </Link>
          <p className='font-medium select-none text-zinc-600'>{job.companyName}</p>
        </div>

        {user.name === job.companyName && (
          <div className='flex items-center gap-4'>
              <Link to={`/edit/job/${job.id}`}>
                <Button title={'Edit'} secondary />
              </Link>
          </div>
        )}
      </header>

      <p className="mb-4 font-normal">{job.description}</p>

      <div className="flex items-center gap-2">
        <Tags title={job.status} />
        <Tags title={job.type} />
      </div>
    </div>
  )
}
