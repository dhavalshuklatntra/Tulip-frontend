// import { useTranslation } from "../i18n/server";

import { SHA256 } from 'crypto-js'
import dayjs from 'dayjs'
import { message } from 'antd'
import { Translation, withTranslation } from 'react-i18next'
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons'

import { useTranslation } from '../i18n/server'
// import AdvanceIcon from "@/app/assets/svgs/listingheader/Advance.svg";
// import BeginnerIcon from "@/app/assets/svgs/listingheader/Beginner.svg?url";
// import IntermediateIcon from "@/app/assets/svgs/listingheader/Intermediate.svg?url";
import FavouritesIcon from '@/app/assets/svgs/listingheader/Favourites.svg?url'
import AcceptedIcon from '@/app/assets/svgs/listingheader/Accepted.svg?url'
import PendingIcon from '@/app/assets/svgs/listingheader/pending.svg?url'
import CompletedIcon from '@/app/assets/svgs/listingheader/Completed.svg?url'
import GurusIcon from '@/app/assets/svgs/listingheader/mentors.svg?url'
import NewGurusIcon from '@/app/assets/svgs/listingheader/newMentor.svg?url'
import EvalPendingIcon from '@/app/assets/svgs/listingheader/eval.svg?url'
import NotSubmittedIcon from '@/app/assets/svgs/listingheader/not-submitted.svg?url'
import InReviewIcon from '@/app/assets/svgs/listingheader/in-review.svg?url'
import FailedIcon from '@/app/assets/svgs/listingheader/failed.svg?url'
import CommunityIco from '@/app/assets/svgs/listingheader/communityIco.svg'

// eslint-disable-next-line react-hooks/rules-of-hooks

export const showSuccess = (messageData) => {
  message.success(<Translation>{(t) => <>{t(messageData)}</>}</Translation>)
}

export const showError = (messageData) => {
  message.error(<Translation>{(t) => <>{t(messageData)}</>}</Translation>)
}

export const getErrorMsg = (error) => {
  return error.message
    ? error.message
    : error.response?.data?.displayMessage
      ? error.response?.data?.displayMessage
      : error.response?.data?.errorMessages?.[0]
}
export const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_BASE_URL
}

export const Encryptpassword = (password) => {
  return SHA256(password).toString()
}

export const overRideData = (payload, apiValue, apiLabel) => {
  const data = []
  payload &&
    payload?.length > 0 &&
    payload.forEach((e) =>
      data.push({ ...e, value: e[apiValue], label: e[apiLabel] })
    )
  return data
}
export const dropdownValueFormatter = (values, labelKey, valueKey) => {
  return values?.map((item) => ({
    lable: item[labelKey],
    value: item[valueKey],
  }))
}
export const forMateSignUpPayload = (rawVal) => {
  return {
    id: 0,
    username: rawVal.firstName,
    password: Encryptpassword(rawVal.password),
    mobile: '',
    email: rawVal.email,
    personalEmail: rawVal.email,
    isActive: true,
    firstname: rawVal.firstName,
    lastname: rawVal.lastName,
    gurukulaId: '',
    dob: dayjs(rawVal.dob).format('YYYY-MM-DD'),
    roles: ['string'],
    countryCode: rawVal.countryname.Iso2,
    countryName: rawVal.countryname.name,
    IsEmailVerified: false,
  }
}

export const getIconForModule = (name) => {
  switch (name) {
    case 'User Management':
      return SmileOutlined
    case 'Category Management':
      return SmileTwoTone
    // case 'Challenge Management':
    //   return CrisisAlertTwoToneIcon;
    // case 'Email Configuration':
    //   return MarkEmailReadTwoToneIcon;
    // case 'Course Management':
    //   return SchoolTwoToneIcon;
    // case 'Role Management':
    //   return PeopleAltTwoToneIcon;
    // case 'MentorShip Requests':
    //   return PeopleAltTwoToneIcon;
    // case 'Community':
    //   return Groups3TwoToneIcon;
    // case 'Career Paths Management':
    //   return SchoolTwoToneIcon;
    default:
      return SmileOutlined
  }
}
export const generatePath = (name, tenantName) => {
  return `/${tenantName}/admin/${name.replace(/\W+/g, '-').toLowerCase()}`
}

export const removeWhiteSpaces = (text) => {
  if (typeof text !== 'string') {
    return ''
  }

  return text.replace(/ +/g, '')
}
export const replaceHyphenWithSpace = (s) => s.replace(/ /g, '_').toLowerCase()

export const getHeaderImage = (level) => {
  const image = {
    Accepted: <AcceptedIcon />,
    Pending: <PendingIcon />,
    Completed: <CompletedIcon />,
    Favourites: <FavouritesIcon />,
    'Evaluation Pending': <EvalPendingIcon />,
    'Not Submitted': <NotSubmittedIcon />,
    'In Review': <InReviewIcon />,
    'Failed Challenges': <FailedIcon />,
    TotalMentors: <GurusIcon />,
    LastMonthJoinMentors: <NewGurusIcon />,
    TotalCommunity: <CommunityIco />,
    MostActiveCommunitiesQuestionAnswer: <CommunityIco />,
  }
  return image[level]
}

export const getFilterObj = (keyValue) => {
  const headerMappings = {
    favouriteCount: {
      header: 'IsFavouriteOn',
      isheader: false,
      isSearch: false,
      translationkey: 'FilterHeader.is_favourite',
    },
    showGlobal: {
      header: 'IsGlobal',
      isheader: false,
      isSearch: false,
    },
    levelWiseCountDtos: {
      header: 'Difficulty Level',
      isheader: true,
      isSearch: false,
      translationkey: 'challenges.difficulty_level',
    },
    topicWiseCountDtos: {
      header: 'Topics',
      isheader: true,
      isSearch: true,
      translationkey: 'FilterHeader.topic',
    },
    skillWiseCountDtos: {
      header: 'Skills',
      isheader: true,
      isSearch: true,
      translationkey: 'FilterHeader.skill',
    },
    // tenantWiseCountDtos: {
    //   header: "Organizations",
    //   isheader: true,
    //   isSearch: true,
    //   translationkey: "challenges.organizations",
    // },
    tagsWiseCounts: {
      header: 'Tags',
      isheader: true,
      isSearch: false,
      translationkey: 'challenges.tags',
    },
    challengeStatusCount: {
      header: 'Challenge Status',
      isheader: true,
      isSearch: false,
      translationkey: 'challenges.status',
    },
    submitssionStatusCount: {
      header: 'Submission Status',
      isheader: true,
      isSearch: false,
      translationkey: 'challenges.submitssionStatusCount',
    },
    sortby: {
      header: 'Sort by',
      isheader: true,
      isSearch: false,
      translationkey: 'Mentors.sort_by',
    },
    areaExpert: {
      header: 'Area of Expertise',
      isheader: true,
      isSearch: false,
      translationkey: 'Mentors.area_expertise',
    },
    statusWiseCountDtos: {
      header: 'Status',
      isheader: true,
      isSearch: false,
      translationkey: 'FilterHeader.status',
    },
    expLevel: {
      header: 'Experience Level',
      isheader: true,
      isSearch: false,
      translationkey: 'Mentors.exp_level',
    },
    typeWiseCountDtos: {
      header: 'Entity Type',
      isheader: true,
      isSearch: false,
      translationkey: 'FilterHeader.type',
    },
  }

  return headerMappings[keyValue] || ''
}
